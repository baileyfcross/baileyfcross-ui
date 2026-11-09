import Link from 'next/link';
import { site } from '@/data/site';
import PixelIcon from '@/components/desktop/PixelIcon';
export default function Home() {
  return (
    <div className="home-notebook">
      <div className="notebook-heading">
        <span className="eyebrow">A FEW NOTES FROM MY CORNER OF THE WEB</span>
        <span className="page-number">01 / HOME</span>
      </div>
      <h1>
        Bailey Cross<span>.</span>
      </h1>
      <p className="home-roles">
        SOFTWARE DEVELOPER <span>·</span> COMPUTING EDUCATOR <span>·</span> GAME DEVELOPER
      </p>
      <div className="notebook-divider" />
      <div className="home-greeting">
        <h2>
          Hello,
          <br />
          curious minds.
        </h2>
        <div className="botanical" aria-hidden="true">
          <svg viewBox="0 0 100 210">
            <path
              d="M46 205Q65 110 47 12M52 155Q12 150 14 120Q46 120 52 155M54 126Q91 113 87 84Q58 89 54 126M53 89Q20 85 22 58Q51 63 53 89M49 55Q75 41 69 18Q49 27 49 55"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M51 153Q24 145 16 122M54 125Q75 104 85 87M53 88Q33 74 23 60"
              fill="none"
              stroke="currentColor"
            />
            <circle cx="47" cy="12" r="7" fill="var(--accent)" />
            <circle cx="69" cy="18" r="6" fill="var(--icon-light)" />
          </svg>
        </div>
      </div>
      <p className="home-intro">
        I build software, teach computing, and create games. This is a place for the projects,
        ideas, and interests I collect along the way.
      </p>
      <div className="home-actions">
        <Link href="/projects/" className="desktop-button">
          <PixelIcon name="folder" size={20} />
          Explore my work ↗
        </Link>
        <Link href="/about/" className="notebook-link">
          A little about me →
        </Link>
      </div>
      <div className="home-footer">
        <span>
          <span className="status-dot" /> ALWAYS LEARNING, ALWAYS BUILDING
        </span>
        <a href={site.linkedin} target="_blank" rel="noreferrer">
          Say hello ↗
        </a>
      </div>
    </div>
  );
}
