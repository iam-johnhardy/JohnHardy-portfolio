import React, { useState, useRef } from "react";
import motherSvg from "../../assets/mother.svg";


export default function AssistantChat() {
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState([]); // { role: "user"|"assistant", text }
  const controllerRef = useRef(null);
  const [showAssistant, setShowAssistant] = useState(false);

  // Streaming and message parsing logic
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setIsStreaming(true);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const url = `/api/stream?message=${encodeURIComponent(trimmed)}`;
      const resp = await fetch(url, { signal: controller.signal });
      if (!resp.ok || !resp.body) {
        throw new Error("Stream failed");
      }
      const reader = resp.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let assistantText = "";
      setMessages(prev => [...prev, { role: "assistant", text: "" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop();
        for (const part of parts) {
          const lines = part.split("\n").map(l => l.trim()).filter(Boolean);
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const payload = line.slice("data: ".length);
              const unescaped = payload.replace(/\\n/g, "\n");
              if (unescaped.trim() === "[DONE]") {
                setIsStreaming(false);
                controllerRef.current = null;
                break;
              }
              const jsonBlobs = [];
              let startIdx = unescaped.indexOf("{");
              while (startIdx !== -1) {
                let braceCount = 0;
                let endIdx = -1;
                for (let i = startIdx; i < unescaped.length; i++) {
                  if (unescaped[i] === "{") braceCount++;
                  if (unescaped[i] === "}") braceCount--;
                  if (braceCount === 0) { endIdx = i; break; }
                }
                if (endIdx === -1) break;
                const blob = unescaped.slice(startIdx, endIdx + 1);
                jsonBlobs.push(blob);
                startIdx = unescaped.indexOf("{", endIdx + 1);
              }
              if (jsonBlobs.length === 0) {
                assistantText += unescaped;
                setMessages(prev => {
                  const copy = [...prev];
                  const idx = copy.length - 1;
                  copy[idx] = { ...copy[idx], text: (copy[idx].text || "") + unescaped };
                  return copy;
                });
              } else {
                for (const blob of jsonBlobs) {
                  try {
                    const parsed = JSON.parse(blob);
                    if (parsed.choices) {
                      for (const ch of parsed.choices) {
                        const delta = ch.delta || ch;
                        const content = (delta && delta.content) || (delta && delta.message && delta.message.content);
                        if (content) {
                          assistantText += content;
                          setMessages(prev => {
                            const copy = [...prev];
                            const idx = copy.length - 1;
                            copy[idx] = { ...copy[idx], text: (copy[idx].text || "") + content };
                            return copy;
                          });
                        }
                      }
                    }
                  } catch (e) {
                    console.warn("Partial JSON, skipping:", e);
                  }
                }
              }
            } else if (line.startsWith("event: done")) {
              setIsStreaming(false);
            } else if (line.startsWith("event: error") || line.startsWith("data: {\"error\"")) {
              setMessages(prev => [...prev, { role: "assistant", text: "\n[Stream error]" }]);
              setIsStreaming(false);
              controllerRef.current = null;
              break;
            }
          }
        }
      }
      setIsStreaming(false);
      controllerRef.current = null;
    } catch (err) {
      console.error("Streaming error:", err);
      setMessages(prev => [...prev, { role: "assistant", text: "\n[Stream failed]" }]);
      setIsStreaming(false);
      controllerRef.current = null;
    }
  };
  // Render only once, outside of async logic
  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col items-center">
      <img
        src={motherSvg}
        alt="Mother Assistant"
        className="w-14 lg:w-24 h-24 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer mb-4"
        onClick={() => setShowAssistant(v => !v)}
        id="assistant-chat"
      />
      {showAssistant && (
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Portfolio AI Assistant</h2>
          <div className="mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about the portfolio..."
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
                onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
                disabled={isStreaming}
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                disabled={isStreaming}
              >
                {isStreaming ? "Streaming..." : "Send"}
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div className={`inline-block p-3 rounded-lg ${m.role === "user" ? "bg-gray-200" : "bg-gray-800 text-white"}`}>
                  <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}