export function filterProductsWithPrice(products = []) {
  return products.filter((product) => {
    if (product.price === null || product.price === undefined || product.price === "") {
      return false;
    }
    return true;
  });
}