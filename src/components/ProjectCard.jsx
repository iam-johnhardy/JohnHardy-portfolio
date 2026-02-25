import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const ProjectCard = ({
  title,
  description,
  technologies,
  projectUrl,
  metrics,
  architecture,
  problemSolution,
  deployment,
  performanceOptimizations,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition-all">
      {/* Header */}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, key) => (
          <span
            key={key}
            className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Main Action Button */}
      <div className="flex justify-between items-center mb-4">
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          View Project →
        </a>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1 text-sm"
        >
          {isExpanded ? "Details" : "Details"}
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>

      {/* Collapsible Details */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-white/10 space-y-5 animate-in fade-in duration-300">
          {/* Metrics */}
          {metrics && Object.keys(metrics).length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                📊 Key Metrics
              </h4>
              <div className="bg-blue-500/5 rounded-lg p-3 space-y-1">
                {typeof metrics === "object" &&
                  !Array.isArray(metrics) &&
                  Object.entries(metrics).map(([key, value]) => (
                    <p key={key} className="text-gray-300 text-sm">
                      <strong>{key}:</strong> {value}
                    </p>
                  ))}
              </div>
            </div>
          )}

          {/* Architecture */}
          {architecture && (
            <div>
              <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                🏗️ Architecture
              </h4>
              <div className="bg-blue-500/5 rounded-lg p-3">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {architecture}
                </p>
              </div>
            </div>
          )}

          {/* Problem-Solution */}
          {problemSolution && (
            <div>
              <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                🎯 Problem & Solution
              </h4>
              <div className="bg-blue-500/5 rounded-lg p-3 space-y-2">
                <div>
                  <p className="text-cyan-400 text-xs font-semibold">Problem:</p>
                  <p className="text-gray-300 text-sm">{problemSolution.problem}</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-xs font-semibold">Solution:</p>
                  <p className="text-gray-300 text-sm">
                    {problemSolution.solution}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Deployment */}
          {deployment && (
            <div>
              <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                🚀 Deployment & Infrastructure
              </h4>
              <div className="bg-blue-500/5 rounded-lg p-3">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {deployment}
                </p>
              </div>
            </div>
          )}

          {/* Performance Optimizations */}
          {performanceOptimizations && (
            <div>
              <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                ⚡ Performance Optimizations
              </h4>
              <div className="bg-blue-500/5 rounded-lg p-3">
                <ul className="space-y-2">
                  {Array.isArray(performanceOptimizations) ? (
                    performanceOptimizations.map((opt, idx) => (
                      <li key={idx} className="text-gray-300 text-sm flex gap-2">
                        <span className="text-cyan-400">✓</span>
                        <span>{opt}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-300 text-sm">
                      {performanceOptimizations}
                    </p>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
