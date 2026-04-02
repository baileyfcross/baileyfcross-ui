export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">About Me</h1>
      
      <div className="max-w-3xl space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Who I Am</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to my portfolio! I&apos;m a passionate developer with a love for creating 
            meaningful digital experiences. This section is where you can share your 
            background, skills, and what drives you professionally.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Journey</h2>
          <p className="text-gray-600 leading-relaxed">
            Here you can describe your professional journey, education, and key experiences 
            that have shaped who you are today. Feel free to customize this content to 
            reflect your unique story.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Git', 'Neo4j', 'Graph Databases', 'Data Pipelines', 'HTML/CSS', 'Regex', 'Typeahead', 'Tailwind CSS'].map((skill) => (
              <span 
                key={skill} 
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}