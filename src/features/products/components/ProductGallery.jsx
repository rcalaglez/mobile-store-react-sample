export default function ProductGallery({ product }) {
  return (
    <div className="flex items-start justify-center rounded-lg p-8">
      <img
        src={product.imgUrl}
        alt={`${product.brand} ${product.model}`}
        className="max-h-105 w-full object-contain"
      />
    </div>
  );
}