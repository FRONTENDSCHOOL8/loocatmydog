import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import GlobalNavBar from '@/components/molecules/GlobalNavBar/GlobalNavBar';
import OutletLayout from './OutletLayout';
import Header from '../molecules/Header/Header';
import { navigationItems } from '@/routes/navigation';
import SideMenu from '../organisms/SideMenu/SideMenu';
import useModalControlStore from '@/store/useModalControl';
import useFirstPathName from '@/hooks/useFirstPathName';

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
  const { isShowModal, resetModal } = useModalControlStore();
  const firstPathName = '/' + useFirstPathName();

  let headerContents = null;
  let sideMenuContents = null;
  const currentRouteObject = navigationItems.find(
    ({ path }) => firstPathName === path
  );
  if (currentRouteObject && currentRouteObject?.headerType) {
    const [type, title] = currentRouteObject.headerType;
    headerContents = <Header type={type} title={title} />;
    sideMenuContents = type === 'main' ? <SideMenu /> : null;
  }

  let isShownGlobalNavBar = true;
  if (
    firstPathName === '/' ||
    firstPathName === '/signin' ||
    firstPathName === '/signup'
  ) {
    isShownGlobalNavBar = false;
  }

  useEffect(() => {
    // 페이지 이동할 때마다 모달 isShow 변수 초기화
    resetModal();
  }, [firstPathName, resetModal]);
  return (
    <StyledRootLayout>
      {headerContents}
      <OutletLayout>
        <Suspense fallback={<div>loading...</div>}>
          <Outlet />
          {isShowModal && sideMenuContents}
        </Suspense>
      </OutletLayout>
      <GlobalNavBar isShown={isShownGlobalNavBar} />
    </StyledRootLayout>
  );
}

export default RootLayout;
