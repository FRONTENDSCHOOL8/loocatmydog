import styled from 'styled-components';
import CheckBox from './../../atoms/CheckBox/CheckBox';

const StyledAnimalRateInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  .inputTextWrapper input {
    inline-size: 100%;
    display: inline-block;
    position: relative;
    padding-inline-end: 20px;
    & span {
      position: absolute;
      right: 0;
    }
  }
  div {
    display: flex;
    flex-grow: 1;
    align-items: center;
  }
`;
const StyledCheckBox = styled(CheckBox)``;

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

      <div>
        <CheckBox style={{ fontSize: '0.75rem' }}>예약불가</CheckBox>
      </div>
    </StyledAnimalRateInput>
  );
};

export default AnimalRateInput;
