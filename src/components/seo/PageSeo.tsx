import Link from 'next/link';
import { pageStructuredData, safeJsonLd, seoPages, type SeoPageKey } from '@/lib/seo';
export default function PageSeo({ page }: { page: SeoPageKey }) {
  const info = seoPages[page];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(pageStructuredData(page)) }}
      />
      {page !== 'home' && (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{info.label}</span>
            </li>
          </ol>
        </nav>
      )}
    </>
  );
}
