export default function DefaultCards({ img, content, unit, value }) {
  return (
    <div className="default-card">
      <p>
        <img src={img} alt="" />
        {content}
      </p>
      <p>
        {value} {unit}
      </p>
    </div>
  );
}
