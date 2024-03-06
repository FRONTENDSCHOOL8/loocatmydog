import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { css } from 'styled-components';
import { format } from 'date-fns';

import useDateRangeStore from '@/store/useDateRange';
import ImageSwiperContainer from '@/components/molecules/ImageSwiper/ImageSwiperContainer';
import A11yHidden from '@/components/A11yHidden/A11yHidden';
import ProfileCard from '@/components/molecules/ProfileCard/ProfileCard';
import HotPlace from '@/components/molecules/HotPlace/HotPlace';
import ContentSwiperContainer from '@/components/molecules/ImageSwiper/ContentSwiperContainer';
import MoreButton from '@/components/atoms/MoreButton/MoreButton';
import DropDown from '@/components/atoms/DropDown/DropDown';
import Place from '@/components/molecules/Place/Place';
import * as S from './StyledMain';
import useGetAllSearchParams from '@/hooks/useGetAllSearchParams';
import pb from '@/api/pocketbase';
import { dummyPlaceData } from '@/data/dummyPlaceData';
import { QueryClient } from '@tanstack/react-query';

type PlaceSortType = {
  id: string;
  label: string;
};
const initialSortType: PlaceSortType[] = [
  {
    id: 'distance',
    label: '거리순',
  },
  {
    id: 'price',
    label: '가격순',
  },
  {
    id: 'popular',
    label: '인기순',
  },
];

export function Component() {
  const { setParams } = useGetAllSearchParams();
  const { dateRange, resetDateRange } = useDateRangeStore();
  const [placeSortType, setPlaceSortType] = useState<PlaceSortType | string>(
    '거리순'
  );
  const navigate = useNavigate();
  const hotPlaceContents = dummyPlaceData.map((item) => (
    <Link key={item.id} to={item.path}>
      <HotPlace {...item} />
    </Link>
  ));
  const handleChangeSortType = ({ id, label }: PlaceSortType) => {
    setPlaceSortType({ id, label });
    setParams('sortType', id);
  };

  useEffect(() => {
    console.log(pb.authStore.isAdmin);
    const [startDate, endDate] = dateRange;
    if (startDate && endDate) {
      navigate(
        `/place_list?sortType=range&startDate=${format(startDate, 'yyMMdd')}&endDate=${format(endDate, 'yyMMdd')}`
      );
      resetDateRange();
    }
  }, [dateRange, navigate, resetDateRange]);

  return (
    <S.MainContainer>
      <A11yHidden as="h2" className="section-title">
        이벤트 배너
      </A11yHidden>
      <ImageSwiperContainer type="link" />

      <S.MainSection $flexDirection="row" $flexGap={10}>
        <h2 className="section-title">
          <span>봐주개냥 서비스</span>
        </h2>
        <div className="section-content">
          <ProfileCard profile={true} name="예약하기">
            필요한 공간을 찾아보세요.
          </ProfileCard>
          <ProfileCard profile={true} name="예약하기">
            필요한 공간을 찾아보세요.
          </ProfileCard>
        </div>
      </S.MainSection>

      <S.MainSection>
        <h2 className="section-title">
          <span>인기 플레이스</span>
          <MoreButton path="/place_list?filterType=range&sortType=popular" />
        </h2>
        <ContentSwiperContainer
          contents={hotPlaceContents}
          swiperParams={{
            direction: 'horizontal',
            'slides-per-view': 1.6,
            'space-between': 20,
            'free-mode': true,
          }}
          styles={css`
            & swiper-container {
            }
          `}
        />
      </S.MainSection>

      <S.MainSection $flexDirection="column" $flexGap={20}>
        <h2 className="section-title">
          <span>플레이스 찾기</span>
          <DropDown items={initialSortType} setCurrent={handleChangeSortType} />
        </h2>
        <div className="section-content">
          {dummyPlaceData.map((item) => (
            <Place
              key={item.id}
              src={item.src}
              title={item.title}
              rate={item.rate}
              reviewNumber={item.reviewNumber}
              address={item.address}
              price={item.price.small}
              heartFill={item.heartFill}
              starFill={item.starFill}
              isActive={item.isActive}
              onChangeHeartButton={(e) => console.log(e.currentTarget)}
            />
          ))}
        </div>
      </S.MainSection>
    </S.MainContainer>
  );
}
Component.displayName = 'Main';

const fetchPlaceList = async () => {
  const response = await pb
    .collection('places')
    .getFullList({ expand: 'userId' });
  const newResponse = response.map((item) => {
    item.photo.map((photo: string) => {
      const url = pb.files.getUrl(item, photo, { thumb: '500x0' });
    });
    console.log(item.photo);
    return item;
  });
  console.log(newResponse);
  return newResponse;
};

export const loader = (queryClient: QueryClient) => async () => {
  return await queryClient.ensureQueryData({
    queryKey: ['places'],
    queryFn: fetchPlaceList,
  });
};
