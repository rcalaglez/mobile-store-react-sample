import { Link, useParams } from "react-router";
import { useProduct } from "@/features/products/hooks/useProduct";
import ProductGallery from "@/features/products/components/ProductGallery";
import ProductDescription from "@/features/products/components/ProductDescription";
import ProductActions from "@/features/products/components/ProductActions";
import Spinner from "@/components/feedback/Spinner";
import ErrorState from "@/components/feedback/ErrorState";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) return <Spinner />;
  if (isError || !product) return <ErrorState />;

  return (
    <article>
      <Link
        to="/"
        className="mb-6 inline-block text-sm text-neutral-500 hover:text-neutral-900"
      >
        ← Volver al listado
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ProductGallery product={product} />

        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-950">
            <span className="text-orange-600">{product.brand}</span>{" "}
            <span>{product.model}</span>
          </h1>

          <div className="mt-4 space-y-6">
            <ProductActions product={product} />
            <ProductDescription product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}