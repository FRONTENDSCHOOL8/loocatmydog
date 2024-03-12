const convertDate = (date: Date) => {
  const year = String(date.getFullYear());
  let month = String(date.getMonth() + 1);
  if (Number(month) < 10) month = `0${month}`;
  let day = String(date.getDate());
  if (Number(day) < 10) day = `0${day}`;

  const reservationDate = `${year}.${month}.${day}`;

  return reservationDate;
};

export default convertDate;