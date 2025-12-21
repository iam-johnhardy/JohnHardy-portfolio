import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const frontendSkills = ["UI/UX Design",
    "React",
    "Vue",
    "JavaScript",
    "TailwindCSS",
    "Material UI",
  ];

  const backendSkills = ["Node.js", "Python", "MongoDB", "PostgreSQL"];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4 ">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            {" "}
            About Me
          </h2>

          <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 hover:border-blue-500/30
              hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]
              transition-all">
            <p className="text-gray-300 mb-6">
              Passionate developer with expertise in building scalable web
              applications and creating innovative solutions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4"> Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4"> Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,2246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-xl border-white/10 border hover:border-blue-500/30
              hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]
              transition-all">
              <h3 className="text-xl font-bold mb-4"> 🏫 Education </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">

                <li>
                  <strong>Web with Python</strong> - <span className="text-gray-400">Aptech Computer Education.</span>
                  (2024)
                </li>
                <li>
                  <strong>Udemy</strong>- <span className="text-gray-400">Complete Full-Stack Web Development Bootcamp</span>. (2023)
                </li>
                <li>
                  <strong> H.N.D </strong> - <span className="text-gray-400">Benue State Polytechnic Ugbokolo, Benue State.</span>
                  (2023)
                </li>
                
              </ul>
            </div>
            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 hover:border-blue-500/30
              hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]
              transition-all">
              <h3 className="text-xl font-bold mb-4"> 💼 Work Experience </h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold">
                    {" "}
                    Software Instructor at Aptech Computer Eduction (2025){" "}
                  </h4>
                  <p className="text-gray-400">
                    Facilitating technical learning through Structured lessons and practicalexercises.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">
                    {" "}
                    Software Instructor at StarLine Eduction (2025 - Present){" "}
                  </h4>
                  <p className="text-gray-400">
                    Supporting technical skill development with organized lessons and practical labs.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">
                    {" "}
                    e-Transfer e-Commerce Platform (Frontend Developer) Aptech Internship (May 2025 - Present){" "}
                  </h4>
                  <p className="text-gray-400">
                    <li>Contributed to the design and build of a vendor-focused e-commerce dashboard, enhancing usability and enabling efficient catalog management and analytics.
                    </li>
                    <li>Implemented intuitive features such as product filtering, secure payment workflow, and help/knowledge resources to support user self-service.
                    </li>
                    <li>Improved system responsiveness, performance, and user experience through thoughtful UI/UX design and Collaborated with cross-functional teams, reinforcing teamwork and communication across project stakeholders.
                    </li>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
