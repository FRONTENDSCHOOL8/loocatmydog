import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { css } from 'styled-components';
import { format } from 'date-fns';

import { PlacesResponse } from '@/@types/database';
import useDateRangeStore from '@/store/useDateRange';
import ImageSwiperContainer from '@/components/molecules/ImageSwiper/ImageSwiperContainer';
import A11yHidden from '@/components/A11yHidden/A11yHidden';
import HotPlace from '@/components/molecules/HotPlace/HotPlace';
import ContentSwiperContainer from '@/components/molecules/ImageSwiper/ContentSwiperContainer';
import MoreButton from '@/components/atoms/MoreButton/MoreButton';
import DropDown from '@/components/atoms/DropDown/DropDown';
import Place from '@/components/molecules/Place/Place';
import * as S from './StyledMain';
import useGetAllSearchParams from '@/hooks/useGetAllSearchParams';
import { dummyPlaceData } from '@/data/dummyPlaceData';
import { fetchPlaceList } from './loader';
import ShortcutMenu from '@/components/molecules/ShortcutMenu/ShortcutMenu';
import usePlaceList from '@/hooks/usePlaceList';

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
  const { data: cachedPlaceData } = usePlaceList();

  const navigate = useNavigate();
  const hotPlaceContents = cachedPlaceData?.map((item) => (
    <Link key={item.id} to={`/place_detail/${item.id}`}>
      <HotPlace
        src={item.photo[0]}
        title={item.title}
        rate={3}
        reviewNumber={21}
        address={item.address}
      />
    </Link>
  ));
  const handleChangeSortType = ({ id, label }: PlaceSortType) => {
    setPlaceSortType({ id, label });
    setParams('sortType', id);
  };

  useEffect(() => {
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
          <ShortcutMenu
            path="/place_list?filterType=range&sortType=popular"
            title="예약하기"
            description="필요한 공간을 찾아보세요."
            photo="/images/sidemenu/sidebar_dog_small.png"
          />
          <ShortcutMenu
            path="/stories"
            title="스토리"
            description="다른 친구들의 이야기"
            photo="/images/place-ex.jpg"
          />
        </div>
      </S.MainSection>

      <S.MainSection>
        <h2 className="section-title">
          <span>인기 플레이스</span>
          <MoreButton path="/place_list?filterType=range&sortType=popular" />
        </h2>
        <ContentSwiperContainer
          contents={hotPlaceContents as React.JSX.Element[]}
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
          {cachedPlaceData?.map((item) => (
            <Place
              key={item.id}
              path={`/place_detail/${item.id}`}
              src={item.photo[0]}
              title={item.title}
              rate={3}
              reviewNumber={25}
              address={item.address}
              price={item.price[0].small}
              heartFill={true}
              isActive={true}
              onChangeHeartButton={(e) => console.log(e.currentTarget)}
            />
          ))}
        </div>
      </S.MainSection>
    </S.MainContainer>
  );
}
Component.displayName = 'Main';
