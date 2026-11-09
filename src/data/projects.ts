export const projects = [
  {
    id: 0,
    title: 'MPI + CUDA Game of Life',
    description:
      "Built a hybrid MPI and CUDA implementation of Conway's Game of Life for AiMOS. Partitioned the board across MPI ranks, exchanged halo rows between neighbors, mapped ranks to GPUs, and benchmarked overlap modes to study how communication and computation interact at scale.",
    technologies: [
      'C',
      'MPI',
      'CUDA',
      'Parallel Computing',
      'GPU Programming',
      'SLURM',
      'Shell Scripting',
      'Performance Benchmarking',
    ],
    status: 'In Progress',
    link: 'https://github.com/baileyfcross/mpi-game-of-life',
  },
  {
    id: 1,
    title: 'Baseball Manager Simulator',
    description:
      'Developed a cross-platform 2D baseball management sim in C# with .NET 9 and MonoGame DesktopGL. Structured the codebase into core, simulation, application, infrastructure, and game layers to support live match gameplay, save data, and ongoing feature development.',
    technologies: ['C#', '.NET 9', 'MonoGame', 'Simulation', 'Clean Architecture'],
    status: 'In Progress',
    link: 'https://github.com/baileyfcross/baseball-manager',
  },
  {
    id: 2,
    title: 'NASA Chikungunya Outbreak Graph Database',
    description:
      'Built a Neo4j graph database integrating NASA weather/time datasets with reported chikungunya outbreak data. Mapped relationships between environmental conditions and outbreak clusters to support pattern detection and research analysis. Designed ingestion pipelines to merge heterogeneous datasets and visualize connections in a graph-first model.',
    technologies: ['Neo4j', 'Graph Databases', 'Data Pipelines'],
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Summer Scholar UI & Regex Analysis Project',
    description:
      'Blueprinted and implemented a new UI to enhance user experience for a data-driven internal tool. Researched and integrated Typeahead libraries and developed complex regular expression handling. Connected user-generated regex inputs to database-stored values for dynamic search and pattern analysis.',
    technologies: ['HTML/CSS', 'JavaScript', 'Regex', 'Typeahead'],
    status: 'Completed',
    link: 'https://github.com/TravelMapping/EduTools',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description:
      'A modern personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Deployed on Azure.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'API Fetching',
      'API Design',
      'API Integration',
      'Azure Deployment',
    ],
    status: 'Ongoing Progress',
    website: 'https://www.baileyfcross.info/',
  },
  {
    id: 5,
    title: 'monkeyhacks.com',
    description:
      'A Counter-Strike 2 website that tracks skin prices and has fun games. Built with Vue.js, Express and Azure.',
    technologies: [
      'Vue.js',
      'Express',
      'Azure Deployment',
      'Azure Management',
      'Typescript',
      'NPM',
      'Node.js',
      'API Fetching',
      'API Design',
      'API Integration',
    ],
    status: 'Ongoing Progress',
    website: 'https://www.monkeyhacks.com/',
  },
];

export const experience = [
  {
    id: 1,
    role: 'Course Assistant',
    company: 'Rensselaer Polytechnic Institute',
    location: 'Troy, NY',
    period: 'January 2026 – Present',
    bullets: [
      'Facilitate assignments and coordinate with other Course Assistants to provide office hours.',
      'Grade quizzes, labs, and participation during lectures.',
      'Provide feedback and learning opportunities to students.',
    ],
  },
  {
    id: 2,
    role: 'Associate Software Engineer',
    company: 'New York Independent System Operator (NYISO)',
    location: 'Rensselaer, NY (Remote)',
    period: 'June 2022 – September 2025',
    bullets: [
      'Coordinated software engineering practices to participate in a team-based approach to problem solving.',
      'Used Java, TypeScript, Angular, and AWS to improve the codebase and implement requested new features.',
      'Dedicated time for thorough continuing education on cutting-edge technologies.',
    ],
  },
  {
    id: 3,
    role: 'PHP Backend Developer Intern',
    company: 'SKS Bottle & Packaging',
    location: 'Saratoga Springs, NY',
    period: 'July 2021 – October 2021',
    bullets: [
      'Coordinated and executed new ideas for an in-house ticketing system.',
      'Maintained and updated PHP7 coding standards and common practices.',
      'Resolved backlogged tickets for greater efficiency among the web team.',
    ],
  },
  {
    id: 4,
    role: 'Student Tutor',
    company: 'Siena College',
    location: 'Loudonville, NY',
    period: 'August 2020 – May 2022',
    bullets: [
      'Educated Siena students in computer science topics such as software development, Java, Python3, and object-oriented design.',
      'Facilitated a flexible and open schedule for tutees.',
      "Tailored a personal record of events to keep for students' reference.",
    ],
  },
];
