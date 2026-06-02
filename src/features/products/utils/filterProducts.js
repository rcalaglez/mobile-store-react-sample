export function filterProducts(products = [], term = "") {
  const query = term.trim().toLowerCase();

  if (!query) return products;

  return products.filter((product) => {
    return (
      product.brand?.toLowerCase().includes(query) ||
      product.model?.toLowerCase().includes(query)
    );
  });
}