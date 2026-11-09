import Link from 'next/link';
import PageHeader from '@/components/desktop/PageHeader';
import PageSeo from '@/components/seo/PageSeo';
import GameOfLife from '@/components/game-of-life/GameOfLife';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('life');
export default function LifePage() {
  return (
    <div className="content-page">
      <PageSeo page="life" />
      <PageHeader index="PROJECTS / INTERACTIVE" title="Conway's Game of Life.">
        Small rules. Unexpected patterns. Explore a living grid, or load a board from my MPI + CUDA
        project.
      </PageHeader>
      <GameOfLife />
      <div className="page-footer-link">
        <Link className="desktop-button" href="/projects/">
          ← Back to projects
        </Link>
      </div>
    </div>
  );
}
