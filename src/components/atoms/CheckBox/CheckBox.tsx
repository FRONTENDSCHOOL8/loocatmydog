import A11yHidden from '@/components/A11yHidden/A11yHidden';
import { ChangeEventHandler, useId } from 'react';
import styled from 'styled-components';

const StyledCheckBoxWrap = styled.div`
  position: relative;
  flex-grow: 1;
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
      ? props.theme.colors.textBlack
      : props.theme.colors.textDarkGray};
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
  label?: boolean;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: 'checkbox' | 'radio';
  [key: string]: any;
}
interface StyleCheckBoxLabelProps {
  $reservation?: boolean;
}

const CheckBox = ({
  isChecked,
  reservation = true,
  type = 'checkbox',
  children,
  label = true,
  name,
  onChange,
  ...restProps
}: CheckBoxProps) => {
  const id = useId();
  return (
    <StyledCheckBoxWrap>
      <StyledCheckBox
        type={type}
        id={id}
        name={name}
        checked={isChecked}
        onChange={onChange}
      ></StyledCheckBox>
      <StyledLabel htmlFor={id} $reservation={reservation} {...restProps}>
        {label ? (
          <span>{children}</span>
        ) : (
          <A11yHidden as="p">{children}</A11yHidden>
        )}
      </StyledLabel>
    </StyledCheckBoxWrap>
  );
};

export default CheckBox;
