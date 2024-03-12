import Tab from '@/components/molecules/Tab/Tab';
import { useAuthStore } from '@/store/useAuthStore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useReservationData from './useReservationData';

const StyledReservations = styled.main`
  inline-size: 100%;
  block-size: 100%;

  & h2 {
    margin: 30px 20px 15px;
  }

  & a {
    text-decoration: none;
  }

  & a:hover {
    text-decoration: none;
  }

  & li:hover {
    background-color: ${(props) => props.theme.colors.gray100};
  }

  .line {
    inline-size: 100%;
    block-size: 0px;
    border: 1px solid;
    border-color: ${(props) => props.theme.colors.gray100};
  }
`;

const Reservations = () => {
  // 로그인 유저 정보
  const currentUserData = useAuthStore.getState().user;
  const currentUserId = currentUserData?.id;

  // 렌더링 모드 상태
  const [modeState, setModeState] = useState<'front' | 'after'>('front');
  const [items, setItems] = useState<(React.JSX.Element | null)[]>([]);

  // 렌더링 모드 변경 이벤트
  const handleMode = () => {
    if (modeState === 'front') {
      setModeState('after');
    } else {
      setModeState('front');
    }
  };

  // 데이터 받기

  const { data, isLoading } = useReservationData(currentUserId);

  useEffect(() => {
    if (isLoading) return;
    if (data) {
      setItems(data.response);
      console.log(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (data) {
      if (modeState === 'front') {
        setItems(data.response);
      } else {
        setItems(data.pastResponse);
      }
    }
  }, [modeState]);

  return (
    <StyledReservations>
      <h2>예약 내역</h2>
      <Tab
        mode={modeState}
        front={'진행 예약'}
        after={'지난 예약'}
        onClick={handleMode}
      ></Tab>
      <ul className="itemContainer">{items}</ul>
    </StyledReservations>
  );
};

export default Reservations;
