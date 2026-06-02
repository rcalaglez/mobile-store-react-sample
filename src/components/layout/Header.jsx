import { Link } from "react-router";
import Breadcrumbs from "./Breadcrumbs";
import CartIcon from "@/components/icons/CartIcon";
export default function Header() {
  const count = 1;

  return (
    <header className="border-b border-neutral-100 bg-white">
      <div className="border-t-4 border-neutral-950">
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

      <div className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs />
        </div>
      </div>
    </header>
  );
}
