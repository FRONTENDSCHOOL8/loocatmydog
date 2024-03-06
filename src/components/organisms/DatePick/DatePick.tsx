import { CustomInput } from '@/components/atoms/Calendar/Calendar';
import useDateRangeStore from '@/store/useDateRange';
import styled from 'styled-components';

const StyledDatePick = styled.div`
  & p {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack};
    margin-bottom: 15px;
  }
  margin-bottom: 30px;
`;

const DatePick = () => {
  const { dateRange } = useDateRangeStore();
  console.log(dateRange);
  return (
    <StyledDatePick>
      <p>날짜 선택</p>
      <CustomInput />
    </StyledDatePick>
  );
};

export default DatePick;
