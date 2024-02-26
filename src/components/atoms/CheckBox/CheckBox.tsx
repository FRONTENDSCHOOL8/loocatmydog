import { Dispatch, SetStateAction, useId } from 'react';
import styled from 'styled-components';

const StyledCheckBoxWrap = styled.div`
  position: relative;
`;

const StyledLabel = styled.label`
  background: url('/images/unchecked.svg') no-repeat 0 0 / contain;
  inline-size: 20px;
  block-size: 20px;
  padding-inline-start: 25px;
  position: absolute;
  left: 0;
`;

const StyledCheckBox = styled.input`
  display: inline-block;
  width: 15px;
  height: 15px;
  transition: all 0.3s;
  appearance: none;

  &:checked + ${StyledLabel} {
    background: url('/images/checked.svg') no-repeat 0 0 / contain;
  }
`;
interface CheckBoxProps {
  id: string;
  isChecked: boolean;
  children: string;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}

const CheckBox = ({ isChecked, setIsChecked, children }: CheckBoxProps) => {
  const checkBoxChecked = () => setIsChecked(!isChecked);
  const id = useId();
  return (
    <StyledCheckBoxWrap>
      <StyledCheckBox
        type={'checkbox'}
        id={id}
        name="test"
        checked={isChecked}
        onChange={checkBoxChecked}
      ></StyledCheckBox>
      <StyledLabel htmlFor={id}>{children}</StyledLabel>
    </StyledCheckBoxWrap>
  );
};

export default CheckBox;
