import { format } from 'date-fns';
import styled from 'styled-components';

const StyledDateDivider = styled.div`
  ${(props) => props.theme.fontStyles.textRegularMd};
  color: ${(props) => props.theme.colors.textDarkGray};
  display: flex;
  align-items: center;
  column-gap: 10px;

  & .line {
    flex: 1;
    block-size: 1px;
    background-color: ${(props) => props.theme.colors.gray300};
  }
`;

interface DateDividerProps {
  date: number | string | Date;
}

const DateDivider = ({ date = new Date().getTime() }: DateDividerProps) => {
  const convertDate = format(date, 'yyyy년 M월 dd일');
  return (
    <StyledDateDivider>
      <div className="line"></div>
      {convertDate}
      <div className="line"></div>
    </StyledDateDivider>
  );
};

export default DateDivider;
