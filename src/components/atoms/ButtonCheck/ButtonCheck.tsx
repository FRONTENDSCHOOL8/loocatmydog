import { Dispatch, SetStateAction, useId } from 'react';
import styled from 'styled-components';

// type 지정
interface ButtonCheckProps {
  name: string;
  children: string;
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}
interface FontTypeProps {
  fontSize: string;
  fontWeight: string;
}

//styled component 작성

const StyledButtonCheckContainer = styled.div`
  position: relative;
  inline-size: 33.333%;
  max-inline-size: 140px;
  min-block-size: 60px;
`;
const StyledButtonCheckP = styled.p<FontTypeProps>`
  ${(props) => props.theme.fontStyles.headingMd}
  color: #333;
  text-align: center;
`;
const StyledButtonCheckLabel = styled.label`
  inline-size: 100%;
  block-size: 100%;
  border-radius: 4px;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  text-align: center;
  border: 1px solid #f1f1f1;
  background: #fff;
`;

const StyledButtonCheck = styled.input`
  inline-size: 100%;
  block-size: 100%;
  appearance: none;
  position: absolute;
  left: 0;

  &:checked + ${StyledButtonCheckLabel} {
    border: 1px solid #ffb62a;
    background: rgba(255, 182, 43, 0.1);
  }
`;

const ButtonList = ({
  name,
  children,
  isChecked,
  setIsChecked,
}: ButtonCheckProps) => {
  const checkBoxChecked = () => setIsChecked(!isChecked);
  const id = useId();
  return (
    <StyledButtonCheckContainer>
      <StyledButtonCheck
        id={id}
        type="checkbox"
        checked={isChecked}
        value={name}
        onChange={checkBoxChecked}
      />
      <StyledButtonCheckLabel htmlFor={id}>
        <StyledButtonCheckP fontSize="14px" fontWeight="600">
          {name}
        </StyledButtonCheckP>
        <StyledButtonCheckP fontSize="12px" fontWeight="300">
          {children}
        </StyledButtonCheckP>
      </StyledButtonCheckLabel>
    </StyledButtonCheckContainer>
  );
};

export default ButtonList;
