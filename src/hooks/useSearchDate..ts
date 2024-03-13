import useDateRangeStore from '@/store/useDateRange';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const useSearchDate = () => {
  const { dateRange, resetDateRange } = useDateRangeStore();
  const navigate = useNavigate();

  useEffect(() => {
    const [startDate, endDate] = dateRange;
    if (startDate && endDate) {
      navigate(
        `/place_list?startDate=${format(startDate, 'yyMMdd')}&endDate=${format(endDate, 'yyMMdd')}`,
        { state: [startDate, endDate] }
      );
      resetDateRange();
    }
  }, [dateRange, navigate, resetDateRange]);
};

export default useSearchDate;
