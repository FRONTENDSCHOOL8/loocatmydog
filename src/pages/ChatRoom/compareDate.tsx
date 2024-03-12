const compareDate = (dateData: Date) => {
  let result;
  const localStorage = window.localStorage;
  const dayOfData = dateData.getDate();

  const current = new Date();
  const currentDate = current.getDate();

  if (!localStorage.getItem('dateInfo')) {
    localStorage.setItem('dateInfo', String(dayOfData));
  }

  const storageData = localStorage.getItem('dateInfo');

  if (Number(storageData) === dayOfData) {
    return (result = true);
  } else {
    const dataDate = localStorage.getItem('dateInfo');

    result = currentDate === Number(dataDate);
    localStorage.removeItem('dateInfo');
  }

  return result;
};

export default compareDate;
