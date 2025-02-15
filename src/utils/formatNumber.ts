export const formatNumber = (number?: number) => {
  return number?.toLocaleString("es-ES") || "0";
};
