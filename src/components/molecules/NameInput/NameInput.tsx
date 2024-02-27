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
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    outline: none;

    & ::placeholder {
      color: ${(props) => props.theme.colors.textGray};
      ${(props) => props.theme.fontStyles.textSemiboldBase}
    }
  }
  & label {
    color: ${(props) => props.theme.colors.textBlack};
    ${(props) => {
      if (props.$mode === 'register') {
        return `${props.theme.fontStyles.textRegularSm}`;
      } else if (props.$mode === 'place') {
        return `${props.theme.fontStyles.textSemiboldBase}`;
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
