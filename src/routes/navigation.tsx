import Header from '@/components/molecules/Header/Header';
import OutletLayout from '@/components/layouts/OutletLayout';
import Main from '@/pages/Main';
import ImageSwiperContainer from '@/components/molecules/ImageSwiper/ImageSwiperContainer';

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
    element: (
      <OutletLayout>
        <Header type="main" title="테스트테스트" />
        <Main />
      </OutletLayout>
    ),
  },
  {
    path: '/place_detail/:id',
    element: '',
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
    element: '',
  },
  {
    path: '/mypet_profile_list',
    element: '',
  },
  {
    path: '/add_mypet_profile',
    element: '',
  },
  {
    path: '/edit_my_profile',
    element: '',
  },
  {
    path: '/bookmark',
    element: '',
  },
  {
    path: '/settings',
    element: '',
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
