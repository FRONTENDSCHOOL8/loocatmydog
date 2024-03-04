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
