import Calendar, { CustomInput } from '@/components/atoms/Calendar/Calendar';
import useReservationStore from '@/store/useReservationStore';
import useDateRangeStore from '@/store/useDateRange';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '@/store/useAuthStore';

const StyledDatePick = styled.div`
  & p {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack};
    margin-bottom: 15px;
  }
  margin-bottom: 30px;
`;

const DatePick = ({ minDate, maxDate }: { minDate: Date; maxDate: Date }) => {
  // console.log(format(dateRange[0], 'yy.MM.dd'));

  return (
    <StyledDatePick>
      <p>날짜 선택</p>
      <Calendar isModal={true} minMaxDateRange={[minDate, maxDate]} />
    </StyledDatePick>
  );
};

export default DatePick;
