import styled from 'styled-components';

const StyledMain = styled.div`
  flex: 1;
`;

function Main() {
  return <StyledMain style={{ background: 'yellow' }}>Main</StyledMain>;
}

export default Main;
