import { useId } from 'react';
import styled from 'styled-components';

interface NameInputLabelProps {
  $mode: 'register' | 'place';
}

const StyledNameInputDiv = styled.div<NameInputLabelProps>`
  display: flex;
  flex-direction: column;
  gap: 15px;

  & input {
    padding-block-end: 5px;
    border: 0;
    border-bottom: 1px solid #d9d9d9;
    outline: none;

    & ::placeholder {
      color: #b8b5ad;
      font-size: 14;
      font-weight: 600;
    }
  }
  & label {
    color: #333333;
    ${(props) => {
      if (props.$mode === 'register') {
        return `font-size: 10px;`;
      } else if (props.$mode === 'place') {
        return `font-size: 14px;`;
      }
    }}
  }
`;

interface NameInputProps {
  mode: 'register' | 'place';
}

const NameInput = ({ mode }: NameInputProps) => {
  const NameId = useId();
  return (
    <StyledNameInputDiv $mode={mode}>
      <label htmlFor={NameId}>이름</label>
      <input type="text" id={NameId} placeholder="실명 입력" />
    </StyledNameInputDiv>
  );
};

export default NameInput;
