import { pageMetadata } from '@/lib/seo';
import PageSeo from '@/components/seo/PageSeo';
import { site } from '@/data/site';
import PageHeader from '@/components/desktop/PageHeader';
export const metadata = pageMetadata('courses');
export default function Courses() {
  return (
    <div className="content-page">
      <PageSeo page="courses" />
      <PageHeader index="05 / YOUR COURSE DIRECTORY" title="A place for every semester.">
        My course directory and instructor workspace live at courses.baileyfcross.info.
      </PageHeader>
      <div className="course-portal-callout">
        <div>
          <h2>Courses & class resources</h2>
          <p>
            Find semester listings, course information, and class materials. Instructor editing
            requires sign-in.
          </p>
          <div className="portal-links">
            <a className="desktop-button" href={site.courses}>
              Open course directory ↗
            </a>
            <a className="desktop-button" href={`${site.courses.replace(/\/$/, '')}/dashboard`}>
              Instructor workspace ↗
            </a>
          </div>
        </div>
      </div>
      <p>
        Having trouble reaching the custom address?{' '}
        <a className="notebook-link" href={site.coursesFallback}>
          Open the alternate portal address ↗
        </a>
      </p>
    </div>
  );
}
