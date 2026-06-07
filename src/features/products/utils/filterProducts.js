export function filterProducts(products = [], term = "") {
  const words = term.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return products;

  return products.filter((product) => {
    const brand = product.brand?.toLowerCase() ?? "";
    const model = product.model?.toLowerCase() ?? "";
    return words.every((word) => brand.includes(word) || model.includes(word));
  });
}
