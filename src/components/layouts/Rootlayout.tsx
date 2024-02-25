import { Outlet } from 'react-router-dom';
import GlobalNavBar from '../GlobalNavBar/GlobalNavBar';
import styled from 'styled-components';

const StyledRootLayout = styled.div`
  min-inline-size: 280px;
  max-inline-size: 420px;
  block-size: 100dvh;
  background-color: skyblue;
  display: flex;
  flex-flow: column nowrap;
`;

function RootLayout() {
  return (
    <StyledRootLayout>
      <Outlet />
      <GlobalNavBar />
    </StyledRootLayout>
  );
}

export default RootLayout;
