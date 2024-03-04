// '@' 포함 검사
export function isEmail(value: string) {
  return value.includes('@');
}

// 빈 값 검사
export function isNotEmpty(value: string) {
  return value.trim() !== '';
}

// 최소 길이 검사
export function hasMinLength(value: string, minLength: number) {
  return value.length >= minLength;
}

// 비밀번호 검사(영문, 숫자, 특수문자 조합 8~20자리)
export function isValidPassword(value: string) {
  const reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
  return reg.test(value);
}

// 일치 여부 검사
export function isEqualsToOtherValue(value: string, otherValue: string) {
  return value === otherValue;
}

// 이름 검사(한글 2~10자리)
export function isName(value: string) {
  const reg = /^[가-힣]{2,10}$/;
  return reg.test(value);
}

// 생년월일 검사(숫자 6자리)
export function isBirthday(value: string) {
  const reg = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;
  return reg.test(value);
}

// 주민등록번호 성별 숫자 검사(1~4 사이의 한자리 수 )
export function isGenderNo(value: string) {
  const reg = /^[1-4]$/;
  return reg.test(value);
}

// 휴대폰 번호 검사
export function isPhone(value: string) {
  const reg = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
  console.log(reg.test(value));
  return reg.test(value);
}
