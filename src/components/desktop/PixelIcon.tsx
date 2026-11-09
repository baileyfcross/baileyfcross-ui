import type { CSSProperties } from 'react';

// Original grid-based icons. Kept as vectors for crisp edges at every scale.
const shapes: Record<string, React.ReactNode> = {
  folder: (
    <>
      <path d="M2 7h8l2 3h18v18H2z" fill="var(--icon-light)" />
      <path d="M2 13h28v15H2z" fill="var(--icon-main)" />
      <path d="M4 15h24v2H4z" fill="var(--icon-shine)" />
    </>
  ),
  computer: (
    <>
      <path d="M3 3h26v20H3zM11 24h10v3h4v3H7v-3h4z" fill="var(--icon-main)" />
      <path d="M6 6h20v14H6z" fill="var(--chrome)" />
      <path d="M9 9h5v2h-3v5h-2zM19 9h4v7h-2v-5h-2z" fill="var(--icon-shine)" />
    </>
  ),
  book: (
    <>
      <path d="M2 6h11l3 3 3-3h11v21H19l-3 2-3-2H2z" fill="var(--icon-light)" />
      <path d="M5 9h8v15H5zM19 9h8v15h-8z" fill="var(--paper)" />
      <path
        d="M15 9h2v18h-2zM6 12h6v2H6zM20 12h6v2h-6zM6 17h6v2H6zM20 17h6v2h-6z"
        fill="var(--icon-main)"
      />
    </>
  ),
  person: (
    <>
      <path d="M10 3h12v3h3v12h-3v3H10v-3H7V6h3zM6 23h20v3h3v5H3v-5h3z" fill="var(--icon-main)" />
      <path d="M12 6h8v12h-8z" fill="var(--icon-light)" />
    </>
  ),
  game: (
    <>
      <path d="M6 9h20v3h3v6h2v10h-7v-4H8v4H1V18h2v-6h3z" fill="var(--icon-main)" />
      <path d="M8 13h3v4h4v3h-4v4H8v-4H4v-3h4z" fill="var(--chrome)" />
      <path d="M23 14h4v4h-4zM19 19h4v4h-4z" fill="var(--icon-light)" />
    </>
  ),
  mountain: (
    <>
      <path d="M0 28 12 7l6 10 5-8 9 19z" fill="var(--icon-main)" />
      <path d="m12 7 5 8h-4l-2 3-3-4zM23 9l4 8h-6z" fill="var(--paper)" />
    </>
  ),
  sun: (
    <>
      <path
        d="M11 8h10v3h3v10h-3v3H11v-3H8V11h3zM14 0h4v5h-4zM14 27h4v5h-4zM0 14h5v4H0zM27 14h5v4h-5zM3 3h4v4H3zM25 3h4v4h-4zM3 25h4v4H3zM25 25h4v4h-4z"
        fill="currentColor"
      />
    </>
  ),
  leaf: (
    <>
      <path d="M28 2v12h-4v5h-5v5H9v-3H5V11h5V7h6V3z" fill="currentColor" />
      <path d="M4 29 23 9" stroke="var(--chrome)" strokeWidth="3" />
    </>
  ),
  snow: (
    <path
      d="M16 1v30M3 8l26 16M3 24 29 8M10 4l6 6 6-6M10 28l6-6 6 6M2 14l8-1-2-8M30 18l-8 1 2 8M2 18l8 1-2 8M30 14l-8-1 2-8"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
    />
  ),
  blossom: (
    <>
      <path d="M12 2h8v7h9v10h-8v10H11v-9H2V10h10z" fill="var(--icon-light)" />
      <path d="M12 11h8v9h-8z" fill="var(--icon-main)" />
    </>
  ),
};
export default function PixelIcon({
  name = 'folder',
  size = 32,
  className = '',
  style,
}: {
  name?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`pixel-icon ${className}`}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {shapes[name] || shapes.folder}
    </svg>
  );
}
