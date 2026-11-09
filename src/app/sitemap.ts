import type { MetadataRoute } from 'next';
import { absoluteUrl, seoPages } from '@/lib/seo';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  // No fabricated lastmod timestamps: a build is not necessarily a content edit.
  // The private course subdomain maintains its own access/indexing policy.
  return Object.values(seoPages).map((page) => ({ url: absoluteUrl(page.path) }));
}
