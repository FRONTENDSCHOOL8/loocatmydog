const getDateDiff = (d1: Date, d2: Date) => {
  const diffDate = d1.getTime() - d2.getTime();
  let leftDay = String(Math.ceil(diffDate / (1000 * 60 * 60 * 24)));

  if (Number(leftDay) === 0) leftDay = 'day';
  else if (Number(leftDay) < 0) leftDay = 'past';

  return leftDay;
};

export default getDateDiff;