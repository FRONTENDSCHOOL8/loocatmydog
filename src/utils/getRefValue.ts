import { RefObject } from "react";

export function getRefValue<C>(ref: RefObject<C>){
  return ref.current as C;
}

// const numberRef = useRef(0);
// const number = getRefValue(numberRef);
// current 값을 바로 뽑아오는 ref 훅 함수