import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import DatePicker, {
  CalendarContainer,
  ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';
import { getMonth, getYear, lightFormat } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getDayOfTheWeek } from '@/utils';

import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/customDatePicker.css';
import styled from 'styled-components';
import useDateRangeStore from '@/store/useDateRange';

interface CustomInputProps {
  value?: string;
  onClick?: any;
}

interface DatePickerContainerProps {
  className: string;
  children: ReactNode;
}

const StyledCustomInput = styled.button`
  border: 1px solid currentColor;
  border-radius: 4px;
  background-color: #fff;
  color: #ffb62b;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  padding: 6px 10px;
`;

const StyledDatePickerHeader = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  margin-block-end: 30px;

  & > button {
    inline-size: 20px;
    block-size: 20px;
    border: none;
    border-radius: 10px;
    background-color: transparent;
    &.left {
      background: url('/images/direction_left.svg');
    }
    &.right {
      background: url('/images/direction_right.svg');
    }
    &:hover {
      background-color: rgba(217, 217, 217, 1);
    }
  }
`;

const StyledDatePickerContainerHeader = styled.div`
  inline-size: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 10px;

  & > button {
    inline-size: 20px;
    block-size: 20px;
    border: none;
    background-color: transparent;
    background: url('/images/cross.svg') no-repeat center;
  }
`;

const StyledDatePickerContainerFooter = styled.div`
  margin-block-start: 30px;
  & ${StyledCustomInput} {
    display: block;
    margin: 0 auto;
  }
`;

export const CustomInput = forwardRef<any, CustomInputProps>(
  ({ value, onClick }, ref) => {
    const date = value
      ?.split(' - ')
      .map((date) => `${date}(${getDayOfTheWeek({ date, options: 'short' })})`)
      .join(' ~ ');
    return (
      <StyledCustomInput onClick={onClick} ref={ref}>
        {date}
      </StyledCustomInput>
    );
  }
);
CustomInput.displayName = 'CustomInput';

const DatePickerContainer = (
  [startDate, endDate]: (Date | null)[],
  handleCloseCalendar: any
) => {
  const innerFunc = ({ className, children }: DatePickerContainerProps) => {
    const startDateText = startDate ? lightFormat(startDate, 'yy.MM.dd') : '';
    const endDateText = endDate ? lightFormat(endDate, 'yy.MM.dd') : '';
    const startDayOfTheWeek = getDayOfTheWeek({
      date: startDateText,
      options: 'short',
    });
    const endDayOfTheWeek = getDayOfTheWeek({
      date: endDateText,
      options: 'short',
    });
    return (
      <div>
        <CalendarContainer className={className}>
          <StyledDatePickerContainerHeader>
            <button
              type="button"
              aria-label="닫기"
              onClick={() => handleCloseCalendar()}
            ></button>
            <span>날짜선택</span>
          </StyledDatePickerContainerHeader>
          <div>{children}</div>
          <StyledDatePickerContainerFooter>
            <StyledCustomInput>{`${startDateText}(${startDayOfTheWeek}) ~ ${endDateText}(${endDayOfTheWeek})`}</StyledCustomInput>
          </StyledDatePickerContainerFooter>
        </CalendarContainer>
      </div>
    );
  };
  return innerFunc;
};

interface CalenderProps {
  minMaxDateRange?: (Date | null)[];
  isModal?: boolean;
  customInput?: ReactNode;
}

const Calendar = ({
  minMaxDateRange = [null, null],
  isModal = false,
  customInput = <CustomInput />,
}: CalenderProps) => {
  const { dateRange, setDateRange } = useDateRangeStore();
  const [minDate, maxDate] = minMaxDateRange;
  const [startDate, endDate] = dateRange;
  const datePickerRef = useRef<any>(null);
  const handleCloseCalendar = () => {
    datePickerRef.current?.setOpen(false);
    if (!startDate || !endDate) setDateRange([minDate, minDate]);
  };
  useEffect(() => {
    if (minMaxDateRange[0] && minMaxDateRange[1])
      setDateRange([minDate, minDate]);
  }, [minDate, setDateRange, minMaxDateRange]);

  return (
    <DatePicker
      ref={datePickerRef}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
      }: ReactDatePickerCustomHeaderProps): ReactNode => (
        <StyledDatePickerHeader>
          <button
            className="left"
            type="button"
            onClick={decreaseMonth}
          ></button>
          <span>{`${getYear(date)}년 ${getMonth(date) + 1}월`}</span>
          <button
            className="right"
            type="button"
            onClick={increaseMonth}
          ></button>
        </StyledDatePickerHeader>
      )}
      locale={ko}
      selectsRange
      dateFormat="yy.MM.dd"
      startDate={startDate}
      endDate={endDate}
      minDate={minDate}
      maxDate={maxDate}
      onClickOutside={() => {
        (!startDate || !endDate) && setDateRange([minDate, minDate]);
      }}
      onChange={(date) => setDateRange(date)}
      customInput={customInput}
      inline={!isModal}
      withPortal={isModal}
      calendarContainer={DatePickerContainer(
        [startDate, endDate],
        handleCloseCalendar
      )}
    />
  );
};

export default Calendar;
