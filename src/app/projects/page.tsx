export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A modern portfolio website built with Next.js and Tailwind CSS",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      status: "In Progress"
    },
    {
      id: 2,
      title: "Project Alpha",
      description: "Description of your first major project. Include the problem it solves and your role.",
      technologies: ["React", "Node.js", "MongoDB"],
      status: "Completed"
    },
    {
      id: 3,
      title: "Project Beta",
      description: "Description of another project. Highlight key features and technologies used.",
      technologies: ["Python", "Django", "PostgreSQL"],
      status: "Completed"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">My Projects</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{project.title}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 text-xs rounded ${
                project.status === 'Completed' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status}
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Want to see more of my work?</p>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Visit My GitHub
        </a>
      </div>
    </div>
  );
}