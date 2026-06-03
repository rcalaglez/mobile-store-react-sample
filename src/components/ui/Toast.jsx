import { useState, useEffect, useCallback } from "react";

export default function Toast({ message, onClose, duration = 3000 }) {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const timeout = setTimeout(handleClose, duration);
    return () => clearTimeout(timeout);
  }, [duration, handleClose]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
        closing
          ? "translate-y-4 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="flex items-center gap-3 rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white shadow-lg">
        <svg
          className="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>{message}</span>
        <button
          type="button"
          onClick={handleClose}
          className="ml-2 shrink-0 text-white/70 transition hover:text-white"
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>
    </div>
  );
}
