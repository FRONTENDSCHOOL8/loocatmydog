import Header from '@/components/molecules/Header/Header';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMain = styled.div`
  flex: 1;
`;

type DateRange = (Date | null)[];
const INITIAL_DATE_RANGE: DateRange = [null, null];

export function Component() {
  const [dateRange, setDateRange] = useState<DateRange>(INITIAL_DATE_RANGE);
  const navigate = useNavigate();
  const handleChangeDate = (date: DateRange) => {
    console.log('handleChangeDateCalled');
    return setDateRange(date);
  };

  useEffect(() => {
    console.log('useEffect called');
    const [startDate, endDate] = dateRange;
    if (startDate && endDate) {
      const startDateParam = format(startDate, 'yyMMdd');
      const endDateParam = format(endDate, 'yyMMdd');
      console.log('다 고름!');
      console.log(startDateParam, endDateParam);
      navigate(
        `/place_list?sortType=range&startDate=${startDateParam}&endDate=${endDateParam}`
      );
    }
  }, [dateRange]);

  return (
    <StyledMain style={{ background: 'yellow' }}>
      <Header
        type="main"
        dateRange={dateRange}
        setDateRange={handleChangeDate}
      />
    </StyledMain>
  );
}

Component.displayName = 'Main';
