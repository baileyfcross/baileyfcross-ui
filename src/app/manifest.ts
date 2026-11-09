import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bailey Cross | Personal Workspace',
    short_name: 'Bailey Cross',
    description: 'Software development, computing education, projects, and class resources.',
    lang: 'en-US',
    start_url: '/',
    scope: '/',
    display: 'browser',
    background_color: '#fff2d4',
    theme_color: '#263c27',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
