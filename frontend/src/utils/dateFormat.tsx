export const dateFormat = (currentDate = new Date()) => {
  currentDate = new Date(currentDate);
  return `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDay()}`;
};
