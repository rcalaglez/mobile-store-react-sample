import { Link, useLocation } from "react-router";

export default function Breadcrumbs() {
  const location = useLocation();
  const isDetail = location.pathname.startsWith("/product/");

  return (
    <nav aria-label="Breadcrumb" className="flex h-12 items-center text-sm">
      <ol className="flex items-center gap-2 text-neutral-500">
        <li>
          <Link to="/" className="transition hover:text-neutral-900">
            Inicio
          </Link>
        </li>

        <li aria-hidden="true" className="text-neutral-400">
          /
        </li>

        <li>
          <Link
            to="/"
            className={
              isDetail
                ? "transition hover:text-neutral-900"
                : "font-medium text-neutral-900"
            }
            aria-current={!isDetail ? "page" : undefined}
          >
            Todos los productos
          </Link>
        </li>

        {isDetail && (
          <>
            <li aria-hidden="true" className="text-neutral-400">
              /
            </li>

            <li className="font-medium text-neutral-900" aria-current="page">
              Detalle de producto
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}