export const currencyFormatter = (price: number) => {
  return new Intl.NumberFormat().format(price);
};
