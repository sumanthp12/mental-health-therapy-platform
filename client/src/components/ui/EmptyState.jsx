export default function EmptyState({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      p-10
      text-center
      border
      "
    >
      <Icon
        size={48}
        className="
        mx-auto
        text-slate-400
        mb-4
        "
      />

      <h3 className="font-semibold text-lg">
        {title}
      </h3>

      <p className="text-slate-500">
        {description}
      </p>
    </div>
  );
}