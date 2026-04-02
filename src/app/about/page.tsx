export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white-800 mb-8">About Me</h1>
      
      <div className="max-w-3xl space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-white-700 mb-4">Who I Am</h2>
          <p className="text-white-600 leading-relaxed">
            Welcome to my portfolio! I&apos;m a passionate developer with a love for creating 
            meaningful digital experiences. With a background in software engineering, I apply everything that I do with a 
            philosophy of learning and iterative design.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white-700 mb-4">My Journey</h2>
          <p className="text-white-600 leading-relaxed">
            I started out as a self-taught programmer, with an intrest in neurophysiology and psycology.
            During my freshman year of college at Siena, I started as a psychology major with an end goal of
            going to PA school. However, I quickly found myself drawn back to the world of computers and programming.
            After taking my first computer scince class, I was hooked. I switched my major to computer science
            and have been on that journy ever since. If you want to know more about my projects or story, feel free
            to reach out to me. 
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white-700 mb-4">Skills & Technologies</h2>
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