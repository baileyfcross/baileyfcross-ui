import type { Metadata } from 'next';
import { site } from '../data/site';
import { projects } from '../data/projects';
import { courses } from '../data/teaching';

export const SITE_ORIGIN = 'https://www.baileyfcross.info';
export const seoPages = {
  home: {
    path: '/',
    label: 'Home',
    title: 'Bailey Cross | Software Developer & Computing Educator',
    description:
      'Explore Bailey Cross’s software projects, computing courses, research, and game development work in a personal workspace that changes with the seasons.',
    card: 'home',
  },
  about: {
    path: '/about/',
    label: 'About',
    title: 'About Bailey Cross | Software Development & Teaching',
    description:
      'Learn about Bailey Cross’s journey into software development, teaching approach, and experience with Java, TypeScript, C#, databases, and parallel computing.',
    card: 'about',
  },
  teaching: {
    path: '/teaching/',
    label: 'Teaching',
    title: 'Computing Courses & Teaching | Bailey Cross',
    description:
      'Explore Bailey Cross’s computing and computer applications courses, classroom approach, research experience, and links to semester resources and course materials.',
    card: 'teaching',
  },
  projects: {
    path: '/projects/',
    label: 'Projects',
    title: 'Software, Simulation & Research Projects | Bailey Cross',
    description:
      'Browse Bailey Cross’s software portfolio, including parallel GPU computing, game simulation, graph databases, web applications, and related work experience.',
    card: 'projects',
  },
  hobbies: {
    path: '/hobbies/',
    label: 'Hobbies',
    title: 'Hobbies & Interests | Bailey Cross',
    description:
      'Get to know Bailey Cross beyond software development through skiing, hiking, reading, gaming, cooking, and music, with curiosity connecting work and play.',
    card: 'hobbies',
  },
  courses: {
    path: '/courses/',
    label: 'Course Portal',
    title: 'Course Directory & Class Resources | Bailey Cross',
    description:
      'Find Bailey Cross’s course portal for semester listings, computing class information, and resource links, with separate sign-in for the instructor workspace.',
    card: 'courses',
  },
} as const;
export type SeoPageKey = keyof typeof seoPages;
export const absoluteUrl = (path: string) => new URL(path, SITE_ORIGIN).href;

/** Complete metadata on every route avoids inherited home URLs or social text. */
export function pageMetadata(key: SeoPageKey): Metadata {
  const page = seoPages[key];
  const image = absoluteUrl(`/social/${page.card}.png`);
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: absoluteUrl(page.path) },
    openGraph: {
      type: 'website',
      siteName: 'Bailey Cross',
      locale: 'en_US',
      title: page.title,
      description: page.description,
      url: absoluteUrl(page.path),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: `${page.label} | Bailey Cross, software developer and computing educator`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [{ url: image, alt: `${page.label} | Bailey Cross` }],
    },
  };
}

/** Use only facts and listings present in the public pages. No ratings or invented credentials. */
export function pageStructuredData(key: SeoPageKey) {
  const page = seoPages[key];
  const personId = absoluteUrl('/#person');
  const websiteId = absoluteUrl('/#website');
  const pageId = absoluteUrl(`${page.path}#webpage`);
  const person = {
    '@type': 'Person',
    '@id': personId,
    name: 'Bailey Cross',
    url: SITE_ORIGIN + '/',
    description: 'Software developer, computing educator, and game developer.',
    jobTitle: ['Software Developer', 'Computing Educator', 'Game Developer'],
    sameAs: [site.github, site.linkedin],
    knowsAbout: [
      'Software development',
      'Computing education',
      'Game development',
      'Java',
      'TypeScript',
      'C#',
      'Graph databases',
      'Parallel computing',
    ],
  };
  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: SITE_ORIGIN + '/',
    name: 'Bailey Cross',
    description: seoPages.home.description,
    inLanguage: 'en-US',
    publisher: { '@id': personId },
  };
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': absoluteUrl(`${page.path}#breadcrumbs`),
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      ...(key === 'home'
        ? []
        : [{ '@type': 'ListItem', position: 2, name: page.label, item: absoluteUrl(page.path) }]),
    ],
  };
  const webpage: Record<string, unknown> = {
    '@type':
      key === 'about'
        ? 'ProfilePage'
        : ['projects', 'teaching'].includes(key)
          ? 'CollectionPage'
          : 'WebPage',
    '@id': pageId,
    url: absoluteUrl(page.path),
    name: page.title,
    description: page.description,
    isPartOf: { '@id': websiteId },
    about: { '@id': personId },
    inLanguage: 'en-US',
    ...(key !== 'home' ? { breadcrumb: { '@id': breadcrumb['@id'] } } : {}),
    ...(key === 'about' ? { mainEntity: { '@id': personId } } : {}),
    ...(key === 'courses' ? { relatedLink: site.courses } : {}),
  };
  const graph: Record<string, unknown>[] = [person, website, webpage];
  if (key !== 'home') graph.push(breadcrumb);
  if (key === 'projects') {
    const list = {
      '@type': 'ItemList',
      '@id': absoluteUrl('/projects/#project-list'),
      name: 'Software and research projects by Bailey Cross',
      itemListElement: projects.map((p, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.title,
          description: p.description,
          url: p.link || p.website || absoluteUrl(`/projects/#project-${p.id}`),
          keywords: p.technologies.join(', '),
        },
      })),
    };
    webpage.mainEntity = { '@id': list['@id'] };
    graph.push(list);
  }
  if (key === 'teaching') {
    const list = {
      '@type': 'ItemList',
      '@id': absoluteUrl('/teaching/#course-list'),
      name: 'Computing courses taught by Bailey Cross',
      itemListElement: courses.map((c, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Course',
          name: c.title,
          courseCode: c.code,
          description: c.description,
          url: c.courseLink,
          provider: { '@type': 'CollegeOrUniversity', name: c.institution },
        },
      })),
    };
    webpage.mainEntity = { '@id': list['@id'] };
    graph.push(list);
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
