import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Breadcrumbs from "./Breadcrumbs";
import CartIcon from "@/components/icons/CartIcon";
import useCart from "@/features/cart/hooks/useCart";

export default function Header() {
  const { count } = useCart();
  const sentinelRef = useRef(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStuck(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-60px 0px 0px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} />
      <header
        className={`sticky top-0 z-50 border-b border-neutral-100 bg-white ${
          stuck ? "shadow-sm" : ""
        }`}
      >
        <div className="border-t-4 border-orange-500">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-neutral-950 transition hover:opacity-80"
              aria-label="Movy - Inicio"
            >
              MOVY
            </Link>

            <Link
              to="/"
              className="relative inline-flex h-10 w-10 items-center justify-center text-neutral-950 transition hover:opacity-70"
              aria-label={`Carrito con ${count} productos`}
            >
              <CartIcon />

              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-md bg-orange-500 px-1 text-xs font-semibold leading-none text-white">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div
          className={`overflow-hidden bg-neutral-50 transition-all duration-200 ${
            stuck ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
          }`}
        >
          <div className="mx-auto max-w-6xl px-4">
            <Breadcrumbs />
          </div>
        </div>
      </header>
    </>
  );
}
