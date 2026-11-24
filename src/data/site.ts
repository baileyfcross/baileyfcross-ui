export const site = {
  name: 'Bailey Cross',
  courses: process.env.NEXT_PUBLIC_COURSES_URL || 'https://courses.baileyfcross.info/',
  coursesFallback: 'https://bailey-cross-courses.flowerybrownie.chatgpt.site/',
  deutschlab: 'https://deutsch.baileyfcross.info/',
  studio: 'https://syracusegamestudio.org/',
  github: 'https://github.com/baileyfcross',
  linkedin: 'https://www.linkedin.com/in/baileyfcross',
};

export const navigation = [
  { name: 'Home', href: '/', icon: 'computer' },
  { name: 'About', href: '/about/', icon: 'person' },
  { name: 'Teaching', href: '/teaching/', icon: 'book' },
  { name: 'Projects', href: '/projects/', icon: 'folder' },
  { name: 'Game of Life', href: '/game-of-life/', icon: 'life' },
  { name: 'DFA Simulator', href: '/dfa-simulator/', icon: 'fsm' },
  { name: 'Hobbies', href: '/hobbies/', icon: 'mountain' },
  { name: 'Courses', href: site.courses, icon: 'book' },
  { name: 'DeutschLab', href: site.deutschlab, icon: 'deutschlab' },
  { name: 'Game Studio', href: site.studio, icon: 'game' },
] as const;
