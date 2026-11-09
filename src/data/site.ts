export const site = {
  name: 'Bailey Cross',
  courses: process.env.NEXT_PUBLIC_COURSES_URL || 'https://courses.baileyfcross.info/',
  coursesFallback: 'https://bailey-cross-courses.flowerybrownie.chatgpt.site/',
  studio: 'https://syracusegamestudio.org/',
  github: 'https://github.com/baileyfcross',
  linkedin: 'https://www.linkedin.com/in/baileyfcross',
};

export const navigation = [
  { name: 'Home', href: '/', icon: 'computer' },
  { name: 'About', href: '/about/', icon: 'person' },
  { name: 'Teaching', href: '/teaching/', icon: 'book' },
  { name: 'Projects', href: '/projects/', icon: 'folder' },
  { name: 'Hobbies', href: '/hobbies/', icon: 'mountain' },
  { name: 'Courses', href: site.courses, icon: 'book' },
  { name: 'Game Studio', href: site.studio, icon: 'game' },
] as const;
