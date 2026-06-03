import ProductCard from "@/features/products/components/ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <p className="py-12 text-center text-sm text-neutral-500">
        No hay productos que coincidan con la búsqueda.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}