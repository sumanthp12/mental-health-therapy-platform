export function Skeleton({
  className = "",
}) {
  return (
    <div
      className={`
        animate-pulse
        rounded-lg
        bg-slate-200
        ${className}
      `}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <Skeleton className="mb-4 h-10 w-10 rounded-xl" />

      <Skeleton className="mb-2 h-4 w-28" />

      <Skeleton className="h-8 w-20" />
    </div>
  );
}

export function TableRowSkeleton({
  columns = 4,
}) {
  return (
    <div
      className="grid items-center gap-4 border-b border-slate-100 px-5 py-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-5 w-full max-w-[180px]"
        />
      ))}
    </div>
  );
}

export function ListSkeleton({
  rows = 5,
}) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
        >
          <Skeleton className="h-10 w-10 rounded-full" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-56" />
          </div>

          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}