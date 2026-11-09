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

type TeachingProject = {
  title: string;
  category: 'knowledge' | 'simulation';
  kind: string;
  affiliation: string;
  description: string;
  tags: string[];
  href: string;
  linkLabel: string;
};

export const courses: Course[] = [
  {
    code: 'CSC 111',
    title: 'Fundamentals of Computing I',
    institution: 'Onondaga Community College',
    term: 'Fall 2026',
    description:
      'An introduction to programming and problem solving using Java. Students build a foundation in program design, variables, control flow, methods, arrays, and objects while learning how to write, test, and improve their own programs.',
    topics: ['Java', 'Problem Solving', 'Program Design', 'Object-Oriented Programming'],
    courseLink: 'https://explore.suny.edu/courses/1437477',
  },
  {
    code: 'CSC 112',
    title: 'Fundamentals of Computing II',
    institution: 'Onondaga Community College',
    term: 'Fall 2026',
    description:
      'A continuation of CSC 111 focused on object-oriented programming, modular class design, data structures, and algorithms. Students work with stacks, queues, lists, trees, recursion, searching, sorting, maps, sets, and exception handling.',
    topics: ['Java', 'Data Structures', 'Algorithms', 'Class Design'],
    courseLink: 'https://explore.suny.edu/courses/1403171',
  },
  {
    code: 'CIS 1041',
    title: 'Computer Applications',
    institution: 'Community College of Vermont',
    term: 'Fall 2026',
    description:
      'A hands-on introduction to office applications for computers and mobile devices. Students develop practical skills with cloud applications, file management, word processing, spreadsheets, presentations, accessibility, and the ethical use of generative AI in the workplace.',
    topics: ['Microsoft 365', 'Cloud Applications', 'Spreadsheets', 'Digital Literacy'],
    courseLink: 'https://andromeda.ccv.vsc.edu/Learn/Grid/Subject.cfm?subject=CIS',
  },
];

export const teachingProjects: TeachingProject[] = [
  {
    title: 'Zettelkasten',
    category: 'knowledge',
    kind: 'PERSONAL KNOWLEDGE SYSTEM',
    affiliation: 'Independent research & teaching',
    description:
      'My linked-note knowledge system helps me connect material across computer science, software development, and research. I use its Markdown and Obsidian workflow as a foundation for source retrieval, local AI experiments, and preparing course materials.',
    tags: ['Obsidian', 'Markdown', 'Knowledge Management', 'Local AI', 'RAG'],
    href: 'https://github.com/baileyfcross/Zettelkasten',
    linkLabel: 'View Zettelkasten repository',
  },
  {
    title: 'Lecture SLM',
    category: 'knowledge',
    kind: 'EDUCATIONAL AI PROJECT',
    affiliation: 'Independent teaching development',
    description:
      'A local lecture-generation system that keeps instructor style, source knowledge, course profiles, and class history separate. It uses retrieval and a staged planning and writing workflow to draft educational material that can be reviewed against its sources.',
    tags: ['Python', 'Local LLMs', 'Retrieval', 'Instructional Design', 'Ollama'],
    href: 'https://github.com/baileyfcross/lecture-sml',
    linkLabel: 'View Lecture SLM repository',
  },
  {
    title: 'Pro Football Dynasty',
    category: 'simulation',
    kind: 'BROWSER SIMULATOR',
    affiliation: 'SyracuseGameStudio',
    description:
      'A browser-based professional football management prototype focused on building a fictional franchise. Manage rosters, contracts, scouting, and the draft as the league develops across seasons.',
    tags: ['Sports Simulation', 'Football', 'Franchise Management', 'Browser Game'],
    href: 'https://syracusegamestudio.org/ProFootballDynasty/',
    linkLabel: 'Open Pro Football Dynasty',
  },
  {
    title: 'Pro Basketball Dynasty',
    category: 'simulation',
    kind: 'BROWSER SIMULATOR',
    affiliation: 'SyracuseGameStudio',
    description:
      'A professional basketball management simulator exploring roster construction, player development, scouting, and rotation decisions alongside a live match simulation.',
    tags: ['Sports Simulation', 'Basketball', 'Team Management', 'Browser Game'],
    href: 'https://syracusegamestudio.org/ProBasketballDynasty/',
    linkLabel: 'Open Pro Basketball Dynasty',
  },
];

export const researchEntries: ResearchEntry[] = [
  {
    title: 'NASA Chikungunya Outbreak Graph Database',
    organization: 'Academic Project',
    description:
      'Built a Neo4j graph database that combined NASA weather and time datasets with reported chikungunya outbreak data. I mapped relationships between environmental conditions and outbreak clusters, then designed ingestion pipelines to merge the datasets and make those relationships easier to analyze.',
    tags: ['Neo4j', 'Graph Databases', 'Data Pipelines', 'Research Analysis'],
  },
  {
    title: 'Summer Scholar UI and Regex Analysis Project',
    organization: 'Siena College',
    period: 'June 2021 – July 2021',
    description:
      'Created a new interface for a data-driven internal tool, researched Typeahead libraries, and developed regular expression handling that connected user input to values stored in a database for dynamic search and pattern analysis.',
    tags: ['JavaScript', 'HTML/CSS', 'Regex', 'Typeahead'],
    link: 'https://github.com/TravelMapping/EduTools',
  },
  {
    title: 'Research Assistant',
    organization: 'Siena College',
    period: 'August 2019 – August 2020',
    description:
      'Participated in laboratory procedures, reviewed published studies with other students, and operated advanced equipment including a Raman spectroscopy laser. This experience helped shape how I approach technical research, documentation, and collaborative problem solving.',
    tags: ['Laboratory Research', 'Raman Spectroscopy', 'Technical Documentation'],
  },
];
