import { Outlet } from 'react-router-dom';
import GlobalNavBar from '@/components/molecules/GlobalNavBar/GlobalNavBar';
import styled from 'styled-components';

const StyledRootLayout = styled.div`
  min-inline-size: 280px;
  max-inline-size: 420px;
  block-size: 100dvh;
  margin: 0 auto;
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
