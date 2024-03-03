import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'date-fns';
import useDateRangeStore from '@/store/useDateRange';
import SideMenu from '@/components/organisms/SideMenu/SideMenu';

const StyledMain = styled.div`
  flex: 1;
`;

export function Component() {
  const { dateRange, resetDateRange } = useDateRangeStore();
  const navigate = useNavigate();
  useEffect(() => {
    const [startDate, endDate] = dateRange;
    if (startDate && endDate) {
      navigate(
        `/place_list?sortType=range&startDate=${format(startDate, 'yyMMdd')}&endDate=${format(endDate, 'yyMMdd')}`
      );
      resetDateRange();
    }
  }, [dateRange, navigate, resetDateRange]);

  return (
    <>
      <StyledMain style={{ background: 'yellow' }}>
        <h2>메인 페이지</h2>
        <SideMenu />
      </StyledMain>
    </>
  );
}
Component.displayName = 'Main';
