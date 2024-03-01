const maskingName = (strName: string) => {
  // 문자열 검색해서 중간 글자 *로 만들기
  // 2글자면 마지막 글자만
  if (strName.length > 2) {
    const originName = strName.split('');
    originName.forEach((name, i) => {
      if (i === 0 || i === originName.length - 1) return;
      originName[i] = '*';
    });
    const joinName = originName.join();
    return joinName.replace(/,/g, '');
  } else {
    const pattern = /.$/; // 정규식
    return strName.replace(pattern, '*');
  }
};

export default maskingName;
