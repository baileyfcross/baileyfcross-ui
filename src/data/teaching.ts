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
