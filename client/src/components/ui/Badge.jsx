export default function Badge({ text, type = "pending" }) {
  return (
    <span className={`badge ${type}`}>
      {text}
    </span>
  );
}