import MyPage from '@/components/organisms/MyPage/MyPage';
import Splash from '@/components/organisms/Splash/Splash';
import Settings from '@/components/organisms/Settings/Settings';
import AddPet from '@/components/organisms/AddPet/AddPet';
import ModifyProfile from '@/components/organisms/ModifyProfile/ModifyProfile';
import HeartList from '@/components/organisms/HeartList/HeartList';
import { RouteObject } from 'react-router-dom';
import Landing from '@/pages/Landing/Landing';

export const navigationItems: RouteObject[] = [
  // 지우님
  {
    path: '/',
    element: <Landing />,
    index: true,
  },
  {
    path: '/signin',
    element: '',
  },
  {
    path: '/signup',
    element: '',
  },
  // 종연님
  {
    path: '/main',
    lazy: () => import('@/pages/Main/Main'),
  },
  {
    // query parameter 종류
    // filterType = range | mine | bookmark
    // filterType=range라면 => &startDate=yyMMdd&endDate=yyMMdd
    // sortType = distance | popular | price
    path: '/place_list',
    lazy: async () => import('@/pages/PlaceList/PlaceList'),
  },

  // 경화님
  {
    path: '/add_place',
    element: '',
  },
  {
    path: '/place_detail/:id',
    element: '',
  },
  {
    path: '/reservation_list/:id',
    element: '',
  },
  {
    path: '/reservation_done',
    element: '',
  },

  // 종명님
  {
    path: '/stories',
    element: '',
  },
  {
    path: '/stories/post',
    element: '',
  },
  {
    path: '/reserve_list',
    element: <></>,
  },
  {
    path: '/chat_list',
    element: '',
  },
  {
    path: '/chat_room',
    element: '',
  },

  // 다영님
  {
    path: '/mypage',
    element: (
      <>
        <MyPage />
      </>
    ),
  },
  {
    path: '/add_mypet',
    element: <AddPet />,
  },
  {
    path: '/edit_my_profile',
    element: <ModifyProfile />,
  },
  {
    path: '/bookmark',
    element: <HeartList />,
  },
  {
    path: '/settings',
    element: (
      <>
        <Settings />
      </>
    ),
  },

  // 미할당
  {
    path: '/events',
    element: '',
  },
  {
    path: '/change_phone',
    element: '',
  },
  {
    path: '/change_address',
    element: '',
  },
];
