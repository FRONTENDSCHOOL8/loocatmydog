import React, { useState } from 'react';

// defaultCalue: 초기값
// validationFn: 각 input에 사용되는 유효성 검사 function
export function useInput(defaultValue: string, validationFn?: any) {
  // input value state
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  // input 수정 여부
  const [didEdit, setDidEdit] = useState(false);

  // 유효성 검사 통과
  const valueIsValid = validationFn(enteredValue);

  // input onChange에 전달될 함수
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  // input onBlur에 전달될 함수
  // onBlur : 포커스가 해지될 때의 이벤트
  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
