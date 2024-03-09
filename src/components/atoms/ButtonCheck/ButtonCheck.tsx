import {
  ChangeEventHandler,
  Dispatch,
  ReactNode,
  SetStateAction,
  useId,
} from 'react';
import styled from 'styled-components';

// type 지정
interface ButtonCheckProps {
  name: string;
  children: string | ReactNode;
  isChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

//styled component 작성

const StyledButtonCheckContainer = styled.div`
  position: relative;
  max-inline-size: 140px;
  min-block-size: 70px;
  inline-size: 30%;
  ${(props) => props.theme.fontStyles.textRegularSm}
  ${(props) => props.theme.colors.textGray}
`;
const StyledButtonCheckP = styled.p`
  ${(props) => props.theme.fontStyles.textSemiboldMd}
  ${(props) => props.theme.colors.textBlack}
  text-align: center;
  margin-bottom: 5px;
`;
const StyledButtonCheckLabel = styled.label`
  inline-size: 100%;
  block-size: 100%;
  border-radius: 4px;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 6px 8px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.lineColorGray};
  background: ${(props) => props.theme.colors.white};
`;

const StyledButtonCheck = styled.input`
  inline-size: 100%;
  block-size: 100%;
  appearance: none;
  position: absolute;
  left: 0;

  &:checked + ${StyledButtonCheckLabel} {
    border: 1px solid ${(props) => props.theme.colors.orange};
    background: rgba(255, 182, 43, 0.1);
  }
`;

const ButtonCheck = ({
  name,
  children,
  isChecked,
  onChange,
}: ButtonCheckProps) => {
  const id = useId();
  return (
    <StyledButtonCheckContainer>
      <StyledButtonCheck
        id={id}
        type="checkbox"
        checked={isChecked}
        value={name}
        onChange={onChange}
      />
      <StyledButtonCheckLabel htmlFor={id}>
        <StyledButtonCheckP>{name}</StyledButtonCheckP>
        <p>{children}</p>
      </StyledButtonCheckLabel>
    </StyledButtonCheckContainer>
  );
};

export default ButtonCheck;
