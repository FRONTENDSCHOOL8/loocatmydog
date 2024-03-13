import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { queryClient } from '@/app/App';
import GlobalNavBar from '@/components/molecules/GlobalNavBar/GlobalNavBar';
import useFirstPathName from '@/hooks/useFirstPathName';
import Authorization from '@/routes/Authorization';
import { navigationItems } from '@/routes/navigation';
import Header from '../molecules/Header/Header';
import OutletLayout from './OutletLayout';
import { useAuthStore } from '@/store/useAuthStore';

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
  // 현재 path의 첫번째 depth의 이름 구하기
  const firstPathName = useFirstPathName();
  // 헤더와 사이드바 컨텐츠 초기화
  let headerContents = null;
  // navigationItem에서 현재 path에 대한 route object 가져오기
  const currentRouteObject = navigationItems.find(
    ({ path }) => firstPathName === path?.split('/')[1]
  );

  // route object가 존재하고 headerType이 존재할 경우 Header와 SideMenu 컴포넌트 삽입
  if (currentRouteObject && currentRouteObject?.headerType) {
    const [type, title] = currentRouteObject.headerType;
    headerContents = <Header type={type} title={title} />;
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

  // 페이지 이동할 때마다 인피니트 쿼리 초기화
  const mainQueryKey = ['places', 'main', 'all'];
  const searchQueryKey = ['places', 'search', 'all', 'all'];
  const placesMainData: PlacesData = queryClient.getQueryData(mainQueryKey);
  const placesSearchData: PlacesData = queryClient.getQueryData(searchQueryKey);
  if (placesMainData?.pageParams.length !== 1) {
    console.log('main 쿼리 초기화');
    queryClient.resetQueries({ queryKey: mainQueryKey });
  }
  if (placesSearchData?.pageParams.length !== 1) {
    console.log('search 쿼리 초기화');
    queryClient.resetQueries({ queryKey: searchQueryKey });
  }

  // withAuthorization true : 로그인 하지 않은 사용자, 추가 정보 입력하지 않은 사용자의 경우 접근 불가
  // withAuthorization false : 모든 사용자가 접근 가능
  // userData : 로그인 사용자의 정보
  // isEdited : 사용자의 추가 정보 입력 여부
  const withAuthorization = currentRouteObject?.withAuthorization;
  const userData = useAuthStore.getState().user;
  const isEdited = userData?.isEdited;

  const contents = (
    <StyledRootLayout>
      {headerContents}
      <OutletLayout>
        <Outlet />
      </OutletLayout>
      <GlobalNavBar isShown={isShownGlobalNavBar} />
    </StyledRootLayout>
  );

  // 추가 정보 입력을 완료한 사용자가 접근한 경우 landing, signup, signin 페이지 접근 시 main페이지로 이동
  if (userData && isEdited) {
    return withAuthorization ? (
      <>{contents}</>
    ) : (
      <Authorization redirectTo="/main" withAuthorization={withAuthorization}>
        {contents}
      </Authorization>
    );
  } else {
    // 로그인 하지 않은 사용자 또는 추가 정보를 입력하지 않은 사용자의 경우 landing, signup, signin 이외의 페이지 접근 시 landing 페이지로 이동
    return withAuthorization ? (
      <Authorization redirectTo="/" withAuthorization={withAuthorization}>
        {contents}
      </Authorization>
    ) : (
      <>{contents}</>
    );
  }
}

export default RootLayout;
