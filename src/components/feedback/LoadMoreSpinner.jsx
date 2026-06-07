export default function LoadMoreSpinner() {
  return (
    <div
      className="inline-flex items-center gap-3 rounded-3xl bg-white px-6 py-4 text-sm font-medium text-neutral-500 shadow-md shadow-neutral-200/70"
      role="status"
      aria-live="polite"
    >
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-200 border-t-orange-600" />
      <span>Cargando más productos</span>
    </div>
  );
}
