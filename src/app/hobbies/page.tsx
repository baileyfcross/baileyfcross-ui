import type { Metadata } from 'next';
import { hobbies } from '@/data/hobbies';
import { site } from '@/data/site';
import PageHeader from '@/components/desktop/PageHeader';
import PixelIcon from '@/components/desktop/PixelIcon';
export const metadata: Metadata = { title: 'Hobbies' };
const icons = ['mountain', 'book', 'mountain', 'game', 'folder', 'computer'];
export default function Hobbies() {
  return (
    <div className="content-page">
      <PageHeader index="04 / AWAY FROM THE KEYBOARD" title="Curiosity, off screen.">
        When I&apos;m not coding, I enjoy exploring various interests and hobbies. These activities
        help me stay creative and often inspire my work.
      </PageHeader>
      <div className="content-grid">
        {hobbies.map((h, i) => (
          <article key={h.id} className="content-card hobby-card">
            <PixelIcon name={icons[i]} size={36} />
            <h3>{h.title}</h3>
            <p>{h.description}</p>
            <span className="hobby-meta">EXPERIENCE / {h.level}</span>
          </article>
        ))}
      </div>
      <section>
        <h2>Something in common?</h2>
        <p>I&apos;d love to connect and share experiences.</p>
        <a className="desktop-button" href={site.linkedin} target="_blank" rel="noreferrer">
          Get in touch ↗
        </a>
      </section>
    </div>
  );
}
