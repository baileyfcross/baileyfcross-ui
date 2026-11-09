export default function About() {
  return (
    <div className="content-page">
      <header className="page-header">
        <span className="eyebrow">01 / A LITTLE ABOUT ME</span>
        <h1>About Me</h1>
        <p>Learning, building, and following my curiosity.</p>
      </header>

      <div className="max-w-3xl space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-white-700 mb-4">Who I Am</h2>
          <p className="text-white-600 leading-relaxed">
            Welcome to my portfolio! I&apos;m a passionate developer with a love for creating
            meaningful digital experiences. With a background in software engineering, I apply
            everything that I do with a philosophy of learning and iterative design.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white-700 mb-4">My Journey</h2>
          <p className="text-white-600 leading-relaxed">
            I started out as a self-taught programmer, with an interest in neurophysiology and
            psychology. During my freshman year of college at Siena, I started as a psychology major
            with an end goal of going to PA school. However, I quickly found myself drawn back to
            the world of computers and programming. After taking my first computer science class, I
            was hooked. I switched my major to computer science and have been on that journey ever
            since. If you want to know more about my projects or story, feel free to reach out to
            me.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white-700 mb-4">Skills & Technologies</h2>

          <div className="mb-4">
            <h3 className="text-lg font-medium text-white-600 mb-2">Proficient In</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Angular',
                'Agile',
                'C',
                'C#',
                'Java',
                '.NET',
                'TypeScript',
                'HTML/CSS/JavaScript',
                'Git',
                'GitHub',
                'GitLab',
                'Unix',
                'SQL',
                'Spring',
                'Spring Boot',
                'Shell Scripting',
                'Parallel Debugging',
                'Performance Analysis',
              ].map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white-600 mb-2">Familiar With</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'AWS',
                'Bootstrap',
                'CUDA',
                'Docker',
                'Figma',
                'FreeBSD',
                'GitHub Actions',
                'Jenkins',
                'MPI',
                'Neo4J',
                'Next.js',
                'Node.js',
                'PHP',
                'PHPStorm',
                'Python3',
                'React',
                'SLURM',
                'Swift',
                'Tailwind CSS',
                'Typeahead',
                'UX Design',
                'Wireframing',
                'MonoGame',
                'Game Development',
                'Cross-Platform Development',
                'Domain Modeling',
                'Simulation Systems',
                'Graph Databases',
                'Data Pipelines',
                'Regex',
                'GPU Programming',
                'Distributed Computing',
              ].map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
