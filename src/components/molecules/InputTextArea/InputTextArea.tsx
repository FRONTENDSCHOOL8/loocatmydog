import styled from 'styled-components';

const InputTextAreaBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputTextAreaSpanWrapper = styled.div`
  display: flex;
`;

const InputTextArea = () => {
  return (
    <InputTextAreaBox>
      <InputTextAreaSpanWrapper>
        <span className="walkRequest">산책 요청 사항</span>
        <span className="essential">&#40;필수&#41;</span>
      </InputTextAreaSpanWrapper>
      <textarea name="contents" cols={20} rows={10}></textarea>
    </InputTextAreaBox>
  );
};

export default InputTextArea;
