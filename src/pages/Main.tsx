import Calendar from '@/components/atoms/Calendar/Calendar';
import styled from 'styled-components';

const StyledMain = styled.div`
  flex: 1;
`;

function Main() {
  return (
    <StyledMain style={{ background: 'yellow' }}>
      <Calendar />
    </StyledMain>
  );
}

export default Main;
