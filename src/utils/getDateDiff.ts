
const getDateDiff = (minDate: Date, maxDate:Date, currentDay: Date) => {

  // 현재 날짜와 시작 날짜 차이
  const minDiff = minDate.getTime() - currentDay.getTime();
  const minGap = Math.ceil(minDiff / (1000 * 60 * 60 * 24));

  // 현재 날짜와 끝 날짜 차이
  const maxDiff = maxDate.getTime() - currentDay.getTime();
  const maxGap = Math.ceil(maxDiff / (1000 * 60 * 60 * 24));

  // 시작 날짜와 일 수 차이 
  if(minGap > 0 && maxGap >= 0){
    return `D-${minGap}`;
  }else if(minGap === 0 && maxGap >= 0){
    return "D-day";
  }else if(minGap < 0 && maxGap >= 0){
    return "이용중";
  }else if(minGap < 0 && maxGap < 0){
    return "past";
  }

}

export default getDateDiff;