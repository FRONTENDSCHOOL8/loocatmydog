import styled from 'styled-components';
import CheckBox from './../../atoms/CheckBox/CheckBox';

const StyledAnimalRateInput = styled.div`
  display: flex;

  .inputTextWrapper {
    flex-grow: 1;
  }
`;
const StyledCheckBox = styled(CheckBox)`
  fontsize: '0.75rem';
  display: flex;
  justify-content: end;
  margin-inline-start: auto;
  & label {
  }
`;

interface CheckBoxProps {
  isChecked: boolean;
}

const AnimalRateInput = () => {
  return (
    <StyledAnimalRateInput>
      <span className="span-title">소형</span>
      <div className="inputTextWrapper">
        <input
          type="text"
          value=""
          className="input-animalRate"
          placeholder="단위)"
        />
        <span>원</span>
      </div>

      <CheckBox style={{ fontSize: '0.75rem' }}>예약불가</CheckBox>
    </StyledAnimalRateInput>
  );
};

export default AnimalRateInput;
