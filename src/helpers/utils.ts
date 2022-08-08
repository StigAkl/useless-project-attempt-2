export const dateToTime = (date: Date) => {
  const timeString = date.getHours() + ":" + date.getMinutes();

  return timeString;
};
