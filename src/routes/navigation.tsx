import Header from '@/components/molecules/Header/Header';
import OutletLayout from '@/components/layouts/OutletLayout';
import ImageSwiperContainer from '@/components/molecules/ImageSwiper/ImageSwiperContainer';
import MyPage from '@/components/organisms/MyPage/MyPage';
import Settings from '@/components/organisms/Settings/Settings';
import AddPet from '@/components/organisms/AddPet/AddPet';
import ModifyProfile from '@/components/organisms/ModifyProfile/ModifyProfile';
import HeartList from '@/components/organisms/HeartList/HeartList';

export const navigationItems = [
  {
    path: '/',
    element: '',
  },
  {
    path: '/signin',
    element: '',
  },
  {
    path: '/find_account',
    element: '',
  },
  {
    path: '/signup',
    element: '',
  },
  {
    path: '/main',
    lazy: async () => {
      const { Component } = await import('@/pages/Main/Main');
      return {
        element: (
          <OutletLayout>
            <Component />
          </OutletLayout>
        ),
      };
    },
  },
  {
    path: '/place_detail/:id',
    element: '',
  },
  {
    path: '/place_list',
    lazy: async () => import('@/pages/PlaceList/PlaceList'),
  },
  {
    path: '/reservation/:id',
    element: '',
  },
  {
    path: '/stories',
    element: '',
  },
  {
    path: '/모달',
    element: '',
  },
  {
    path: '/mypage',
    element: (
      <OutletLayout>
        <Header type="main" title="테스트테스트" />
        <MyPage />
      </OutletLayout>
    ),
  },
  {
    path: '/mypet_profile_list',
    element: '',
  },
  {
    path: '/add_mypet_profile',
    element: (
      <OutletLayout>
        <Header type="main" title="테스트테스트" />
        <AddPet />
      </OutletLayout>
    ),
  },
  {
    path: '/edit_my_profile',
    element: (
      <OutletLayout>
        <Header type="main" title="테스트테스트" />
        <ModifyProfile />
      </OutletLayout>
    ),
  },
  {
    path: '/bookmark',
    element: (
      <OutletLayout>
        <Header type="main" title="테스트테스트" />
        <HeartList />
      </OutletLayout>
    ),
  },
  {
    path: '/settings',
    element: (
      <OutletLayout>
        <Header type="main" title="테스트테스트" />
        <Settings />
      </OutletLayout>
    ),
  },
  {
    path: '/add_place',
    element: '',
  },
  {
    path: '/chat_list',
    element: '',
  },
  {
    path: '/chat_room',
    element: '',
  },
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
  {
    path: '/reservation_list',
    element: (
      <OutletLayout>
        <Header type="main" title="테스트테스트" />
        <ImageSwiperContainer />
      </OutletLayout>
    ),
  },
];
