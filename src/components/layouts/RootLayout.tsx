import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import GlobalNavBar from '@/components/molecules/GlobalNavBar/GlobalNavBar';
import OutletLayout from './OutletLayout';
import Header from '../molecules/Header/Header';
import { navigationItems } from '@/routes/navigation';
import SideMenu from '../organisms/SideMenu/SideMenu';
import useModalControlStore from '@/store/useModalControl';
import useFirstPathName from '@/hooks/useFirstPathName';
import { queryClient } from '@/app/App';

const StyledRootLayout = styled.div`
  position: relative;
  min-inline-size: 280px;
  max-inline-size: 420px;
  block-size: 100dvh;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
`;

type PlacesData = { pageParams: number[] } | undefined;

function RootLayout() {
  const { isShowModal, resetModal } = useModalControlStore();
  // 현재 path의 첫번째 depth의 이름 구하기
  const firstPathName = useFirstPathName();
  // 헤더와 사이드바 컨텐츠 초기화
  let headerContents = null;
  let sideMenuContents = null;
  // navigationItem에서 현재 path에 대한 route object 가져오기
  const currentRouteObject = navigationItems.find(
    ({ path }) => firstPathName === path?.split('/')[1]
  );

  // route object가 존재하고 headerType이 존재할 경우 Header와 SideMenu 컴포넌트 삽입
  if (currentRouteObject && currentRouteObject?.headerType) {
    const [type, title] = currentRouteObject.headerType;
    headerContents = <Header type={type} title={title} />;
    sideMenuContents = type === 'main' ? <SideMenu /> : null;
  }

  // 랜딩, 로그인, 회원가입 페이지에는 GNB 숨기기
  let isShownGlobalNavBar = true;
  if (
    firstPathName === '' ||
    firstPathName === 'signin' ||
    firstPathName === 'signup'
  ) {
    isShownGlobalNavBar = false;
  }

  // 메인페이지에서 벗어나면 인피니트 쿼리 초기화
  if (firstPathName !== 'main') {
    const queryKey = ['places'];
    const placesData: PlacesData = queryClient.getQueryData(queryKey);
    // if (placesData?.pageParams.length !== 1) {
    console.log('인피니트 쿼리 초기화!');
    queryClient.resetQueries({ queryKey });
    // }
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
