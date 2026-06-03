import { useState } from "react";

export default function Collapsible({ title, defaultOpen = true, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
      className="overflow-hidden rounded-lg border border-neutral-200"
    >
      <summary className="flex cursor-pointer select-none items-center justify-between bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100">
        {title}
        <svg
          className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div>{children}</div>
    </details>
  );
}
