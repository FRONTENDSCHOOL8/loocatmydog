import Calendar, { CustomInput } from '@/components/atoms/Calendar/Calendar';
import useReservationStore from '@/store/useReservationStore';
import useDateRangeStore from '@/store/useDateRange';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledDatePick = styled.div`
  & p {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack};
    margin-bottom: 15px;
  }
  margin-bottom: 30px;
`;

const DatePick = ({ minDate, maxDate }: { minDate: Date; maxDate: Date }) => {
  const { dateRange } = useDateRangeStore();
  const { setReservation, reservation } = useReservationStore();
  useEffect(() => {
    setReservation({ date: dateRange }, 'vfmxkb6b62e5rvm');
  }, [dateRange]);

  // console.log(format(dateRange[0], 'yy.MM.dd'));

  return (
    <StyledDatePick>
      <p>날짜 선택</p>
      <Calendar isModal={true} minMaxDateRange={[minDate, maxDate]} />
    </StyledDatePick>
  );
};

export default DatePick;
