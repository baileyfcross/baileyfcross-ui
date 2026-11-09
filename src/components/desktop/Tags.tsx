export default function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="tag">
          {item}
        </span>
      ))}
    </div>
  );
}
