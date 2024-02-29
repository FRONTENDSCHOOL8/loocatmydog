import CheckBox from '@/components/atoms/CheckBox/CheckBox';
import styled from 'styled-components';

const StyledAnimalRateInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 15px;
  padding-block: 8px;
  inline-size: 100%;
  border: 1px solid black;

  & .span-title {
    ${(props) => props.theme.fontStyles.textRegularMd}
    color: ${(props) => props.theme.colors.textBlack};
  }

  & .inputTextWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* flex-grow: 1; */

    & input {
      vertical-align: top;
      ${(props) => props.theme.fontStyles.textRegularMd}
      color: ${(props) => props.theme.colors.textBlack};
    }
    & input::placeholder {
      ${(props) => props.theme.fontStyles.textRegularMd}
      color: ${(props) => props.theme.colors.textDarkGray};
    }

    & span {
      ${(props) => props.theme.fontStyles.textRegularMd}
      color: ${(props) => props.theme.colors.textBlack};
    }
  }

  & .input-animalRate {
    border: none;
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
