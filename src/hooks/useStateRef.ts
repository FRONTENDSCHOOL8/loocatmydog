import { RefObject, useRef, useState } from "react";

export function useStateRef<S>(
  defaultValue: S
): [S, (value: S) => void, RefObject<S>]{
  const ref = useRef(defaultValue);
  const [state, _setState] = useState(defaultValue);
  const setState = (value: S) => {
    _setState(value);
    ref.current = value;
  }

  return [state, setState, ref];
}

// parameter로 받은 값을 state & setState 함수 & ref 값으로 저장
// setState 함수 사용시 해당 ref 값과 state 값 모두 변경 