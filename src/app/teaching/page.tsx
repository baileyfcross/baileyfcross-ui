import { pageMetadata } from '@/lib/seo';
import PageSeo from '@/components/seo/PageSeo';
import { courses, researchEntries } from '@/data/teaching';
import { site } from '@/data/site';
import PageHeader from '@/components/desktop/PageHeader';
import PixelIcon from '@/components/desktop/PixelIcon';
import Tags from '@/components/desktop/Tags';
export const metadata = pageMetadata('teaching');
export default function Teaching() {
  return (
    <div className="content-page">
      <PageSeo page="teaching" />
      <PageHeader index="02 / INSIDE THE CLASSROOM" title="Ideas into understanding.">
        My goal is to give students a practical foundation they can use in future courses,
        professional work, and their own projects.
      </PageHeader>
      <section className="course-portal-callout">
        <PixelIcon name="book" size={40} />
        <div>
          <h2>A place for every semester.</h2>
          <p>
            Visit my course directory for semester listings, course information, and class
            resources.
          </p>
          <div className="portal-links">
            <a className="desktop-button" href={site.courses}>
              Open courses.baileyfcross.info ↗
            </a>
            <a className="fallback-link" href={site.coursesFallback}>
              Alternate portal address ↗
            </a>
          </div>
        </div>
      </section>
      <section>
        <h2>Courses & classroom work</h2>
        <div className="content-grid">
          {courses.map((c) => (
            <article className="content-card" key={c.code}>
              <div className="card-index">
                <span>{c.code}</span>
                <span>{c.term}</span>
              </div>
              <h3>{c.title}</h3>
              <p>
                <strong>{c.institution}</strong>
              </p>
              <p>{c.description}</p>
              <Tags items={c.topics} />
              <a className="card-link" href={c.courseLink} target="_blank" rel="noreferrer">
                Official course information ↗
              </a>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2>Research & project experience</h2>
        <div className="experience-list">
          {researchEntries.map((e) => (
            <article key={e.title} className="experience-entry">
              <h3>{e.title}</h3>
              <p className="organization">{e.organization}</p>
              {e.period && <span className="period">{e.period}</span>}
              <p>{e.description}</p>
              <Tags items={e.tags} />
              {e.link && (
                <a className="card-link" href={e.link} target="_blank" rel="noreferrer">
                  View project ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
