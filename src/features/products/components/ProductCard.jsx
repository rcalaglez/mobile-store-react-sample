import { Link } from "react-router";
import { formatPrice } from "@/lib/priceUtils";

export default function ProductCard({ product }) {
  const price = formatPrice(product.price);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-lg bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
      aria-label={`Ver detalle de ${product.brand} ${product.model}`}
    >
      <div className="flex h-64 items-center justify-center px-8 pt-8 pb-5 bg-stone-50">
        {product.imgUrl ? (
          <img
            src={product.imgUrl}
            alt={`${product.brand} ${product.model}`}
            className="max-h-50 w-full object-contain transition duration-300 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-neutral-100 text-sm text-neutral-400">
            Sin imagen
          </div>
        )}
      </div>

      <div className="border-t border-neutral-100 px-6 py-5">
        <h2 className="line-clamp-2 text-md font-bold tracking-tight text-neutral-950">
          <span className="text-orange-600">{product.brand}</span>{" "}
          <span>{product.model}</span>
        </h2>

        <p className="mt-3 text-xl font-bold tracking-tight text-neutral-950">
          {price}
        </p>
      </div>
    </Link>
  );
}