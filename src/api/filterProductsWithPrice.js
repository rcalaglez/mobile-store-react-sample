export function filterProductsWithPrice(products = []) {
  console.log(products);
  return products.filter((product) => {
    if (product.price === null || product.price === undefined || product.price === "") {
      return false;
    }
    return true;
  });
}