import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Hello, I'm <span className="text-blue-600">Bailey Cross</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A passionate developer creating meaningful digital experiences. 
          Welcome to my portfolio where I showcase my projects, share my journey, and explore my interests.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/projects" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View My Work
          </Link>
          <Link 
            href="/about" 
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Learn About Me
          </Link>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Explore My World</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Link href="/about" className="group">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border group-hover:border-blue-200">
              <div className="text-4xl mb-4">👋</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">About Me</h3>
              <p className="text-gray-600">
                Learn about my background, journey, and the skills I bring to every project.
              </p>
            </div>
          </Link>
          
          <Link href="/projects" className="group">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border group-hover:border-blue-200">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">My Projects</h3>
              <p className="text-gray-600">
                Explore the applications and solutions I've built using various technologies.
              </p>
            </div>
          </Link>
          
          <Link href="/hobbies" className="group">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border group-hover:border-blue-200">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">My Hobbies</h3>
              <p className="text-gray-600">
                Discover what I enjoy outside of coding and how it influences my work.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className="py-16 bg-white rounded-xl shadow-sm border">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Technical Skills</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Git', 'Tailwind CSS'].map((skill) => (
              <span 
                key={skill} 
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="text-center">
            <Link 
              href="/about" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View Full Skill Set →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Let's Work Together</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          I'm always interested in new opportunities and exciting projects. 
          Feel free to reach out if you'd like to collaborate or just say hello!
        </p>
        <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium">
          Get In Touch
        </button>
      </section>
    </div>
  );
}
