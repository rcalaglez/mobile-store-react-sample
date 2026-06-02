import { useEffect, useRef, useState } from "react";
import SearchIcon from "@/components/icons/SearchIcon";

export default function SearchBar({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  function handleToggle() {
    setIsOpen((current) => !current);
  }

  function handleClear() {
    onChange("");
    inputRef.current?.focus();
  }

  return (
    <section className="flex justify-end">
      <div
        className={`flex items-center gap-1 rounded-2xl bg-white p-1 shadow-sm transition-all duration-300 ${
          isOpen ? "w-full sm:w-96" : "w-12"
        }`}
      >
        <button
          type="button"
          onClick={handleToggle}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-neutral-900 transition hover:bg-neutral-100"
          aria-label={isOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
          aria-expanded={isOpen}
        >
          <SearchIcon />
        </button>

        <div
          className={`grid flex-1 transition-all duration-300 ease-out ${
            isOpen ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <label htmlFor="product-search" className="sr-only">
              Buscar productos
            </label>

            <div className="flex items-center">
              <input
                ref={inputRef}
                id="product-search"
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Buscar por marca o modelo…"
                className="search-input h-10 w-full min-w-0 bg-transparent px-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
              />
              {value && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="mr-2 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900"
                  aria-label="Limpiar búsqueda"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
