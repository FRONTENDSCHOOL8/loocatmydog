import { RefObject, useRef, useState } from "react";

export function getRefValue<C>(ref: RefObject<C>){
  return ref.current as C;
}

// const numberRef = useRef(0);
// const number = getRefValue(numberRef);
// current 값을 바로 뽑아오는 ref 훅 함수


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