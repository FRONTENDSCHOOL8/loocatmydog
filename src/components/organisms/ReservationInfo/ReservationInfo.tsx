import styled from 'styled-components';
import { ReactNode } from 'react';

interface ReservationInfoProps {
  mindate: ReactNode;
  maxdate: ReactNode;
  require: string;
  etc: string;
}

const StyledReservationInfo = styled.div`
  display: flex;
  inline-size: 100%;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.gray100};
  padding: 20px 10px 10px;
  & .dateInfo {
    display: flex;
    justify-content: space-between;
    padding: 10px 0 20px;
    & .bar {
      inline-size: 1px;
      background: ${(props) => props.theme.colors.gray300};
      transform: rotate(30deg);
    }
  }
  & .startDate span {
    display: block;
    ${(props) => props.theme.fontStyles.textRegularMd}
    color: ${(props) => props.theme.colors.textDarkGray};
    margin-bottom: 10px;
  }
  & .startDate p {
    ${(props) => props.theme.fontStyles.textMediumBase}
    color: ${(props) => props.theme.colors.textBlack};
  }
  & .textarea {
    ${(props) => props.theme.fontStyles.textRegularSm}
    color: ${(props) => props.theme.colors.textDarkGray};
  }
`;

const ReservationInfo = ({
  mindate,
  maxdate,
  require,
  etc,
}: ReservationInfoProps) => {
  return (
    <StyledReservationInfo>
      <div className="dateInfo">
        <div className="startDate">
          <span>시작</span>
          <p>{mindate} </p>
        </div>
        <div className="bar"></div>
        <div className="startDate">
          <span>종료</span>
          <p>{maxdate} </p>
        </div>
      </div>
      <div className="textarea">{require}</div>
      <div className="textarea">{etc}</div>
    </StyledReservationInfo>
  );
};
export default ReservationInfo;
