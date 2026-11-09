import type { Metadata } from 'next';
import { projects, experience } from '@/data/projects';
import { site } from '@/data/site';
import PageHeader from '@/components/desktop/PageHeader';
import Tags from '@/components/desktop/Tags';
export const metadata: Metadata = { title: 'Projects' };
export default function Projects() {
  return (
    <div className="content-page">
      <PageHeader index="03 / THE PROJECT FOLDER" title="Things I've been building.">
        A selection of work I&apos;ve built and contributed to, from software and simulation to
        research.
      </PageHeader>
      <div className="content-grid">
        {projects.map((project, i) => {
          const content = (
            <>
              <div className="card-index">
                <span>PROJECT / {String(i + 1).padStart(2, '0')}</span>
                <span>↗</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Tags items={project.technologies} />
              <span className="status-tag">{project.status}</span>
              {(project.link || project.website) && (
                <span className="card-link">
                  {project.link ? 'View repository' : 'Visit website'}
                  <span>↗</span>
                </span>
              )}
            </>
          );
          return project.link || project.website ? (
            <a
              key={project.id}
              className="content-card"
              href={project.link || project.website}
              target="_blank"
              rel="noreferrer"
            >
              {content}
            </a>
          ) : (
            <article key={project.id} className="content-card">
              {content}
            </article>
          );
        })}
      </div>
      <div className="page-footer-link">
        <a className="desktop-button" href={site.github} target="_blank" rel="noreferrer">
          More on GitHub ↗
        </a>
        <a className="desktop-button" href={site.studio}>
          SyracuseGameStudio ↗
        </a>
      </div>
      <section>
        <h2>Work experience</h2>
        <div className="experience-list">
          {experience.map((job) => (
            <article className="experience-entry" key={job.id}>
              <h3>{job.role}</h3>
              <p className="organization">{job.company}</p>
              <span className="period">
                {job.location} / {job.period}
              </span>
              <ul>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
