import type { Metadata } from "next";

type Course = {
  code: string;
  title: string;
  institution: string;
  term: string;
  description: string;
  topics: string[];
  courseLink: string;
};

type ResearchEntry = {
  title: string;
  organization: string;
  period?: string;
  description: string;
  tags: string[];
  link?: string;
};

const courses: Course[] = [
  {
    code: "CSC 111",
    title: "Fundamentals of Computing I",
    institution: "Onondaga Community College",
    term: "Fall 2026",
    description:
      "An introduction to programming and problem solving using Java. Students build a foundation in program design, variables, control flow, methods, arrays, and objects while learning how to write, test, and improve their own programs.",
    topics: ["Java", "Problem Solving", "Program Design", "Object-Oriented Programming"],
    courseLink: "https://explore.suny.edu/courses/1437477",
  },
  {
    code: "CSC 112",
    title: "Fundamentals of Computing II",
    institution: "Onondaga Community College",
    term: "Fall 2026",
    description:
      "A continuation of CSC 111 focused on object-oriented programming, modular class design, data structures, and algorithms. Students work with stacks, queues, lists, trees, recursion, searching, sorting, maps, sets, and exception handling.",
    topics: ["Java", "Data Structures", "Algorithms", "Class Design"],
    courseLink: "https://explore.suny.edu/courses/1403171",
  },
  {
    code: "CIS 1041",
    title: "Computer Applications",
    institution: "Community College of Vermont",
    term: "Fall 2026",
    description:
      "A hands-on introduction to office applications for computers and mobile devices. Students develop practical skills with cloud applications, file management, word processing, spreadsheets, presentations, accessibility, and the ethical use of generative AI in the workplace.",
    topics: ["Microsoft 365", "Cloud Applications", "Spreadsheets", "Digital Literacy"],
    courseLink: "https://andromeda.ccv.vsc.edu/Learn/Grid/Subject.cfm?subject=CIS",
  },
];

const researchEntries: ResearchEntry[] = [
  {
    title: "NASA Chikungunya Outbreak Graph Database",
    organization: "Academic Project",
    description:
      "Built a Neo4j graph database that combined NASA weather and time datasets with reported chikungunya outbreak data. I mapped relationships between environmental conditions and outbreak clusters, then designed ingestion pipelines to merge the datasets and make those relationships easier to analyze.",
    tags: ["Neo4j", "Graph Databases", "Data Pipelines", "Research Analysis"],
  },
  {
    title: "Summer Scholar UI and Regex Analysis Project",
    organization: "Siena College",
    period: "June 2021 – July 2021",
    description:
      "Created a new interface for a data-driven internal tool, researched Typeahead libraries, and developed regular expression handling that connected user input to values stored in a database for dynamic search and pattern analysis.",
    tags: ["JavaScript", "HTML/CSS", "Regex", "Typeahead"],
    link: "https://github.com/TravelMapping/EduTools",
  },
  {
    title: "Research Assistant",
    organization: "Siena College",
    period: "August 2019 – August 2020",
    description:
      "Participated in laboratory procedures, reviewed published studies with other students, and operated advanced equipment including a Raman spectroscopy laser. This experience helped shape how I approach technical research, documentation, and collaborative problem solving.",
    tags: ["Laboratory Research", "Raman Spectroscopy", "Technical Documentation"],
  },
];

export const metadata: Metadata = {
  title: "Teaching | Bailey Cross",
  description:
    "Courses taught by Bailey Cross at Onondaga Community College and the Community College of Vermont, along with related research and project experience.",
};

export default function Teaching() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-4xl font-bold text-white-800 mb-2">Teaching</h1>
      <p className="text-white-500 mb-8 leading-relaxed max-w-4xl">
        Beginning in Fall 2026, I will be teaching computer science and computer applications courses at
        Onondaga Community College and the Community College of Vermont. My goal is to give students a
        practical foundation they can use in future courses, professional work, and their own projects.
      </p>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white-800 mb-6">Courses I Am Teaching</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <a
              key={course.code}
              href={course.courseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <p className="text-sm font-semibold text-blue-600 mb-1">{course.code}</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
              <p className="text-gray-700 font-medium leading-snug">{course.institution}</p>
              <p className="text-sm text-gray-500 mb-4">{course.term}</p>

              <p className="text-gray-600 mb-5 leading-relaxed flex-grow">{course.description}</p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((topic) => (
                    <span key={topic} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <span className="mt-auto text-sm font-medium text-blue-600 hover:text-blue-800">
                View course information →
              </span>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white-800 mb-2">Research and Project Experience</h2>
        <p className="text-white-500 mb-8 leading-relaxed">
          My teaching is supported by experience across software development, data-focused projects, and
          hands-on academic research.
        </p>

        <div className="space-y-6">
          {researchEntries.map((entry) => (
            <div key={entry.title} className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{entry.title}</h3>
                  <p className="text-blue-600 font-medium">{entry.organization}</p>
                </div>
                {entry.period && <span className="text-sm text-gray-500 whitespace-nowrap">{entry.period}</span>}
              </div>

              <p className="text-gray-600 leading-relaxed mb-4">{entry.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {entry.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {entry.link && (
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded"
                >
                  View project →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}