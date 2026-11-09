export default function PageHeader({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-header">
      <span className="eyebrow">{index}</span>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </header>
  );
}
