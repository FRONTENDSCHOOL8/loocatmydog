const dayArray = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

const getDayOfTheWeek = ({
  date,
  options,
}: {
  date: string;
  options?: 'short';
}): string => {
  if (date === '') return '';
  let newDate = date;
  if (parseInt(date).toString().length === 2) newDate = '20' + date;
  const result = dayArray[new Date(newDate).getDay()];
  return options === 'short' ? result[0] : result;
};

export default getDayOfTheWeek;
