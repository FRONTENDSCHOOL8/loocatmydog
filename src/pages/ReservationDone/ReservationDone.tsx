import ReservationInfo from '@/components/organisms/ReservationInfo/ReservationInfo';
import useReservationStore from '@/store/useReservationStore';
import { getDay, getMonth } from 'date-fns';
import styled from 'styled-components';
import { useLoaderData, useNavigate } from 'react-router-dom';
import pb from '@/api/pocketbase';
import { useState } from 'react';
import Button from '@/components/atoms/Button/Button';

const StyledReservationDone = styled.div`
  padding: 20px 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 30px;
  & .title {
    ${(props) => props.theme.fontStyles.headingMd};
    color: ${(props) => props.theme.colors.textBlack};
  }
`;

const ReservationDone = () => {
  const placeData = useLoaderData() as any;
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState();
  console.log(placeData.expand[`reservation(placeId)`]);
  const reservData = placeData.expand[`reservation(placeId)`][0];

  function handleClick() {
    return navigate('/main');
  }
  return (
    <StyledReservationDone>
      <div className="innerWrw">
        <p className="title">예약 완료!</p>
        <p className="dateInfo"></p>
        <p>플레이스와 함께하세요</p>
      </div>
      <ReservationInfo
        mindate={`${getMonth(reservData.minDate) + 1}월 ${getDay(reservData.minDate)}일`}
        maxdate={`${getMonth(reservData.maxDate) + 1}월 ${getDay(reservData.maxDate)}일`}
        require={reservData.require}
        etc={reservData.etc}
      />
      <Button
        size="100%"
        mode="normal"
        style={{ marginTop: '30px' }}
        onClick={handleClick}
      >
        메인으로 돌아가기
      </Button>
    </StyledReservationDone>
  );
};

export default ReservationDone;
