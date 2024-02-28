import styled from 'styled-components';
import StateBadge from '../StateBadge/StateBadge';

//type 정의
interface DateListProps {
  year: number;
  month: number;
  day: number;
  dDay: string;
  review?: boolean;
}

//style 컴포넌트
const StyledDateList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.textBlack};
  font-size: ${(props) => props.theme.fontSizes.nameTitle};

  &.reviewtext {
    color: ${(props) => props.theme.colors.textGray};
    font-size: ${(props) => props.theme.fontSizes.description};
    margin-bottom: 3px;
  }

  .dDay {
    color: ${(props) => props.theme.colors.red};
    font-size: ${(props) => props.theme.fontSizes.description};
    font-weight: ${(props) => props.theme.fontWeight.regular};
    margin-top: 3px;
  }
  .date {
    margin-bottom: 3px;
  }
`;
//Date 기능 가져온 후 연도/월/일 변수 나누기
const DateList = ({
  year,
  day,
  month,
  dDay = 'd-day',
  review,
}: DateListProps) => {
  return (
    <StyledDateList className={review ? 'reviewtext' : ''}>
      <span className="year">{year}</span>
      <span className="date">
        {month}/{day}
      </span>
      {review ? <StateBadge isActive /> : <span className="dDay">{dDay}</span>}
    </StyledDateList>
  );
};
export default DateList;
