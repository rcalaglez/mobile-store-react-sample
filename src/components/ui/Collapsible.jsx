import { useState } from "react";

export default function Collapsible({ title, defaultOpen = true, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full cursor-pointer select-none items-center justify-between bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
        aria-expanded={isOpen}
      >
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
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
