import pb from '@/api/pocketbase';
import debounce from '@/utils/debounce';
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

  // 중복 여부
  const [isDuplicate, setIsDuplicate] = useState(false);

  // input onChange에 전달될 함수
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  // input onBlur에 전달될 함수
  // onBlur : 포커스가 해지될 때의 이벤트
  function handleInputBlur(
    event: React.FocusEvent<HTMLInputElement>,
    inputType?: string
  ) {
    setDidEdit(true);
    setIsDuplicate(false);

    if (inputType === 'email' && valueIsValid) {
      const checkEmail = debounce((value) => checkEmailDuplicate(value), 300);
      checkEmail(event.target.value);
    }

    if (inputType === 'phone' && valueIsValid) {
      const checkPhone = debounce((value) => checkPhoneDuplicate(value), 300);
      checkPhone(event.target.value);
    }
  }

  const checkEmailDuplicate = async (value: string) => {
    const records = await pb.collection('users').getFullList({
      filter: `email = "${value}"`,
    });
    if (records.length > 0) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  };

  const checkPhoneDuplicate = async (value: string) => {
    const records = await pb.collection('users').getFullList({
      filter: `phone = "${value}"`,
    });
    if (records.length > 0) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  };

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
    isDuplicate,
  };
}
