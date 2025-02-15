export const getCurrentMonthYear = () => {
  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const currentDate = year + "-" + month;

  return currentDate;
};
