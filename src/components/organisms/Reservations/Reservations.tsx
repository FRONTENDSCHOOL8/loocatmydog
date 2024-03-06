import Tab from '@/components/molecules/Tab/Tab';
import { useState } from 'react';
import styled from 'styled-components';

const StyledReservations = styled.main`
  & h2 {
    margin: 30px 20px 15px;
  }
`;

const Reservations = () => {
  // 렌더링 모드 상태
  const [modeState, setModeState] = useState<'front' | 'after'>('front');

  // 렌더링 모드 변경 이벤트
  const handleMode = () => {
    if (modeState === 'front') {
      setModeState('after');
    } else {
      setModeState('front');
    }
  };

  return (
    <StyledReservations>
      <h2>예약 내역</h2>
      <Tab
        mode={modeState}
        front={'진행 예약'}
        after={'지난 예약'}
        onClick={handleMode}
      ></Tab>
    </StyledReservations>
  );
};

export default Reservations;
