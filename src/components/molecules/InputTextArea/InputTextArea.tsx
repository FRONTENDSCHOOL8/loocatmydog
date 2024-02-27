import styled from 'styled-components';

const InputTextAreaBox = styled.div`
  display: flex;
  flex-direction: column;
`;

interface InputTextAreaSpanWrapperProps {
  $mode: '필수' | '선택';
}

const InputTextAreaSpanWrapper = styled.div<InputTextAreaSpanWrapperProps>`
  display: flex;

  & .walkRequest {
    ${(props) => props.theme.fontStyles.textSemiboldBase};
    color: ${(props) => props.theme.colors.textBlack};
  }

  & .essential {
    ${(props) => props.theme.fontStyles.textRegularMd}
    color: ${(props) => {
      if (props.$mode === '필수') {
        return `${props.theme.colors.orange}`;
      } else if (props.$mode === '선택') {
        return `${props.theme.colors.textGray}`;
      }
    }};
  }
`;

interface InputTextAreaProps {
  request?: string;
  requestCheck: '필수' | '선택';
}

const InputTextArea = ({
  request = '산책 요청 사항',
  requestCheck = '필수',
}: InputTextAreaProps) => {
  return (
    <InputTextAreaBox>
      <InputTextAreaSpanWrapper $mode={requestCheck}>
        <span className="walkRequest">{request}</span>
        <span className="essential">&#40;{requestCheck}&#41;</span>
      </InputTextAreaSpanWrapper>
      <textarea name="contents" cols={20} rows={10}></textarea>
    </InputTextAreaBox>
  );
};

export default InputTextArea;
