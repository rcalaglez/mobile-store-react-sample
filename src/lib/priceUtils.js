export function formatPrice(price) {
  if (price === null || price === undefined || price === "") {
    return "—";
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return `${price} €`;
  }

  return `${numericPrice.toLocaleString("es-ES")} €`;
}