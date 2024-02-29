import styled from 'styled-components';
import StateBadge from '../StateBadge/StateBadge';

//type 정의
interface DateListProps {
  date: string;
  dDay: string;
  mode: 'normal' | 'fill';
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
  date,
  dDay = 'd-day',
  review,
  mode,
  ...restProps
}: DateListProps) => {
  return (
    <StyledDateList className={review ? 'reviewtext' : ''} {...restProps}>
      <span className="year">{date.slice(0, 4)}</span>
      <span className="date">
        {date.slice(5, 7)}/{date.slice(8)}
      </span>
      {review ? (
        <StateBadge mode={mode} isActive />
      ) : (
        <span className="dDay">{dDay}</span>
      )}
    </StyledDateList>
  );
};
export default DateList;
