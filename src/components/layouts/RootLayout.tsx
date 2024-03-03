import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import GlobalNavBar from '@/components/molecules/GlobalNavBar/GlobalNavBar';
import OutletLayout from './OutletLayout';
import Header from '../molecules/Header/Header';
import { navigationItems } from '@/routes/navigation';

const StyledRootLayout = styled.div`
  position: relative;
  min-inline-size: 280px;
  max-inline-size: 420px;
  block-size: 100dvh;
  margin: 0 auto;
  background-color: skyblue;
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
`;

function RootLayout() {
  const { pathname } = useLocation();
  let headerContents = null;
  const currentRouteObject = navigationItems.find(
    ({ path }) => pathname === path
  );
  if (currentRouteObject && currentRouteObject?.headerType) {
    const [type, title] = currentRouteObject.headerType;
    headerContents = <Header type={type} title={title} />;
  }

  let isShownGlobalNavBar = true;
  if (pathname === '/signin' || pathname === '/signup') {
    isShownGlobalNavBar = false;
  }

  return (
    <StyledRootLayout>
      {headerContents}
      <OutletLayout>
        <Suspense fallback={<div>loading...</div>}>
          <Outlet />
        </Suspense>
      </OutletLayout>
      <GlobalNavBar isShown={isShownGlobalNavBar} />
    </StyledRootLayout>
  );
}

export default RootLayout;
