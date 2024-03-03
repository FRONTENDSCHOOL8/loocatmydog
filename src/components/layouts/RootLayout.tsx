import { Outlet, useLocation } from 'react-router-dom';
import GlobalNavBar from '@/components/molecules/GlobalNavBar/GlobalNavBar';
import styled from 'styled-components';
import OutletLayout from './OutletLayout';
import { Suspense } from 'react';
import Header, { HeaderProps } from '../molecules/Header/Header';

const StyledRootLayout = styled.div`
  min-inline-size: 280px;
  max-inline-size: 420px;
  block-size: 100dvh;
  margin: 0 auto;
  background-color: skyblue;
  display: flex;
  flex-flow: column nowrap;
`;
type HeaderConfig = { [key: string]: [HeaderProps['type'], string | null] };

const headerConfig: HeaderConfig = {
  signin: ['back', null],
  signup: ['step', null],
  main: ['main', null],
  place_list: ['main', null],
  mypage: ['popup', '마이 페이지'],
  add_mypet: ['back', '반려동물 추가'],
  edit_my_profile: ['back', '프로필 변경'],
  bookmark: ['logo', null],
  settings: ['logo', null],
  myplace_list: ['back', '나의 플레이스'],
  add_place: ['back', '플레이스 등록'],
  place_detail: ['place', null],
  reservation_done: ['popup', null],
  stories: ['logo', null],
  'stories/post': ['popup', null],
  reserve_list: ['logo', null],
  chatroom_list: ['back', '채팅 목록'],
};

function RootLayout() {
  const { pathname } = useLocation();
  const currentPathname = pathname.slice(1);
  let headerContents = null;
  if (headerConfig[currentPathname])
    headerContents = (
      <Header
        type={headerConfig[currentPathname][0]}
        title={headerConfig[currentPathname][1]}
      />
    );

  let isShownGlobalNavBar = true;
  if (
    !currentPathname ||
    currentPathname === 'signin' ||
    currentPathname === 'signup'
  ) {
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
