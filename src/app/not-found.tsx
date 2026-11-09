import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="not-found">
      <span className="eyebrow">FILE NOT FOUND / 404</span>
      <h1>A little off the trail.</h1>
      <p>This page may have moved. Head back to the workspace to keep exploring.</p>
      <Link className="desktop-button" href="/">
        Return home →
      </Link>
    </div>
  );
}
