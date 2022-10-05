const formatDate = (date: Date | string) => {
  if (typeof date === "string") date = new Date(date);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const formatTime = (date: Date | string) => {
  if (typeof date === "string") date = new Date(date);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const formatDateTime = (date: Date | string) =>
  `${formatDate(date)} ${formatTime(date)}`;

export { formatDate, formatDateTime };
