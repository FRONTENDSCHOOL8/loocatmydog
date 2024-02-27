import { Dispatch, SetStateAction, useId } from 'react';
import styled from 'styled-components';

const StyledCheckBoxWrap = styled.div`
  position: relative;
`;

const StyledLabel = styled.label<StyleCheckBoxLabelProps>`
  background: url('/images/unchecked.svg') no-repeat 0 0 / contain;
  block-size: 20px;
  padding-inline-start: 25px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.$reservation
      ? props.theme.colors.textDarkGray
      : props.theme.colors.textBlack};
  ${(props) => props.theme.fontStyles.textRegularBase};
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
  isChecked: boolean;
  reservation?: boolean;
  children: string;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}
interface StyleCheckBoxLabelProps {
  $reservation?: boolean;
}

const CheckBox = ({
  isChecked,
  setIsChecked,
  reservation,
  children,
  ...restProps
}: CheckBoxProps) => {
  const checkBoxChecked = () => setIsChecked(!isChecked);
  const id = useId();
  return (
    <StyledCheckBoxWrap>
      <StyledCheckBox
        type="checkbox"
        id={id}
        name="test"
        checked={isChecked}
        onChange={checkBoxChecked}
        {...restProps}
      ></StyledCheckBox>
      <StyledLabel htmlFor={id} $reservation={reservation}>
        {children}
      </StyledLabel>
    </StyledCheckBoxWrap>
  );
};

export default CheckBox;
