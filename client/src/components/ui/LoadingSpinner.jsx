import { Loader2 } from "lucide-react";

export default function LoadingSpinner({
  size = "md",
  label = "Loading...",
  fullScreen = false,
}) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };

  const containerClass = fullScreen
    ? "flex min-h-[60vh] items-center justify-center"
    : "flex items-center justify-center py-10";

  return (
    <div
      className={containerClass}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex items-center gap-3 text-slate-500">
        <Loader2
          className={`${sizes[size]} animate-spin text-blue-600`}
        />

        <span className="text-sm font-medium">
          {label}
        </span>
      </div>
    </div>
  );
}