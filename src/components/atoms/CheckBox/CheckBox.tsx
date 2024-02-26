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

const StyledCheckBox = styled.input.attrs({ type: 'checkbox', id: 'check1' })`
  display: inline-block;
  width: 15px;
  height: 15px;
  transition: all 0.3s;
  appearance: none;

  &:checked + label {
    background: url('/images/checked.svg') no-repeat 0 0 / contain;
  }
`;

const CheckBox = () => {
  return (
    <StyledCheckBoxWrap>
      <StyledCheckBox type={'checkbox'} id="test1" name="test"></StyledCheckBox>
      <StyledLabel htmlFor="test1">test</StyledLabel>
    </StyledCheckBoxWrap>
  );
};

export default CheckBox;
