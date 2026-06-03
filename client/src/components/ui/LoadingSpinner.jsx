export default function LoadingSpinner() {
  return (
    <div
      className="
      h-screen
      flex
      justify-center
      items-center
      "
    >
      <div
        className="
        w-12
        h-12
        border-4
        border-sky-500
        border-t-transparent
        rounded-full
        animate-spin
        "
      />
    </div>
  );
}