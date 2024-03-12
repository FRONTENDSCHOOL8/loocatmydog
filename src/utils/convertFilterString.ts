import { typeOf } from '.';

const convertFilterString = (
  fieldName: string,
  operator: string,
  target: any
) => {
  const targetType = typeOf(target);
  let result = `${fieldName} ${operator} "${target}"`;
  if (targetType === 'object')
    throw new Error(
      'getFilterString 함수는 오직 문자열 또는 배열만 변환 할 수 있습니다.'
    );

  if (targetType === 'array') {
    if (target.length === 0) return null;
    const FilterArray = [...target].map(
      (item) => `${fieldName} ${operator} "${item}"`
    );
    result = `(${FilterArray.join(' || ')})`;
  }
  return result;
};

export default convertFilterString;
