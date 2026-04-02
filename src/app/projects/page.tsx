const projects = [
  {
    id: 1,
    title: "NASA Chikungunya Outbreak Graph Database",
    description:
      "Built a Neo4j graph database integrating NASA weather/time datasets with reported chikungunya outbreak data. Mapped relationships between environmental conditions and outbreak clusters to support pattern detection and research analysis. Designed ingestion pipelines to merge heterogeneous datasets and visualize connections in a graph-first model.",
    technologies: ["Neo4j", "Graph Databases", "Data Pipelines"],
    status: "Completed",
  },
  {
    id: 2,
    title: "Summer Scholar UI & Regex Analysis Project",
    description:
      "Blueprinted and implemented a new UI to enhance user experience for a data-driven internal tool. Researched and integrated Typeahead libraries and developed complex regular expression handling. Connected user-generated regex inputs to database-stored values for dynamic search and pattern analysis.",
    technologies: ["HTML/CSS", "JavaScript", "Regex", "Typeahead"],
    status: "Completed",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A modern personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Deployed on a self-hosted Ubuntu/Debian home server.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "In Progress",
  },
];

const experience = [
  {
    id: 1,
    role: "Course Assistant",
    company: "Rensselaer Polytechnic Institute",
    location: "Troy, NY",
    period: "January 2026 – Present",
    bullets: [
      "Facilitate assignments and coordinate with other Course Assistants to provide office hours.",
      "Grade quizzes, labs, and participation during lectures.",
      "Provide feedback and learning opportunities to students.",
    ],
  },
  {
    id: 2,
    role: "Associate Software Engineer",
    company: "New York Independent System Operator (NYISO)",
    location: "Rensselaer, NY (Remote)",
    period: "June 2022 – September 2025",
    bullets: [
      "Coordinated software engineering practices to participate in a team-based approach to problem solving.",
      "Used Java, TypeScript, Angular, and AWS to improve the codebase and implement requested new features.",
      "Dedicated time for thorough continuing education on cutting-edge technologies.",
    ],
  },
  {
    id: 3,
    role: "PHP Backend Developer Intern",
    company: "SKS Bottle & Packaging",
    location: "Saratoga Springs, NY",
    period: "July 2021 – October 2021",
    bullets: [
      "Coordinated and executed new ideas for an in-house ticketing system.",
      "Maintained and updated PHP7 coding standards and common practices.",
      "Resolved backlogged tickets for greater efficiency among the web team.",
    ],
  },
  {
    id: 4,
    role: "Student Tutor",
    company: "Siena College",
    location: "Loudonville, NY",
    period: "August 2020 – May 2022",
    bullets: [
      "Educated Siena students in computer science topics such as software development, Java, Python3, and object-oriented design.",
      "Facilitated a flexible and open schedule for tutees.",
      "Tailored a personal record of events to keep for students' reference.",
    ],
  },
];

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Projects Section */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Projects</h1>
      <p className="text-gray-500 mb-8">A selection of work I&apos;ve built and contributed to.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow flex flex-col"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{project.title}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{project.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <span
              className={`self-start px-2 py-1 text-xs rounded ${
                project.status === "Completed"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {project.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-6 text-center">
        <a
          href="https://github.com/baileyfcross"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          View More on GitHub
        </a>
      </div>

      {/* Work Experience Section */}
      <h2 className="text-3xl font-bold text-gray-800 mt-16 mb-2">Work Experience</h2>
      <p className="text-gray-500 mb-8">My professional background in software and beyond.</p>

      <div className="space-y-8">
        {experience.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-md p-6 border">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{job.role}</h3>
                <p className="text-blue-600 font-medium">{job.company}</p>
                <p className="text-gray-500 text-sm">{job.location}</p>
              </div>
              <span className="mt-2 sm:mt-0 text-sm text-gray-500 whitespace-nowrap">{job.period}</span>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {job.bullets.map((bullet, i) => (
                <li key={i} className="text-gray-600 leading-relaxed">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}