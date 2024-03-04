import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
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

const StyledMainContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 40px;
`;

interface StyledMainSectionProps {
  $flexDirection?: string;
  $flexGap?: number;
}

const StyledMainSection = styled.section<StyledMainSectionProps>`
  padding-inline: 20px;
  &:last-child {
    padding-block-end: 40px;
  }
  & .section-title {
    ${(props) => props.theme.fontStyles.headingMd};
    margin-block-end: 15px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
  & .section-content {
    display: flex;
    flex-flow: ${(props) => `${props.$flexDirection || 'row'} nowrap`};
    gap: ${(props) => `${props.$flexGap || 0}px`};
  }
`;

const placeContent = [
  {
    id: 0,
    title: '플레이스 이름1',
    tags: ['좋아요', '깨끗해요', '친절해요'],
    price: {
      small: 30000,
      middle: 40000,
      large: 50000,
    },
    rate: 0,
    reviewNumber: 1,
    src: '/images/place-ex.jpg',
    address: '서울 마포구',
    isActive: true,
    heartFill: true,
    starFill: true,
    path: '/place_detail/0',
  },
  {
    id: 1,
    title: '플레이스 이름2',
    tags: ['좋아요', '깨끗해요', '친절해요'],
    price: {
      small: 30000,
      middle: 40000,
      large: 50000,
    },
    rate: 1,
    reviewNumber: 12,
    src: '/images/place-ex.jpg',
    address: '서울 마포구',
    isActive: false,
    heartFill: true,
    starFill: true,
    path: '/place_detail/1',
  },
  {
    id: 2,
    title: '플레이스 이름3',
    tags: ['좋아요', '깨끗해요', '친절해요'],
    price: {
      small: 30000,
      middle: 40000,
      large: 50000,
    },
    rate: 2,
    reviewNumber: 52,
    src: '/images/place-ex.jpg',
    address: '서울 마포구',
    isActive: false,
    heartFill: false,
    starFill: true,
    path: '/place_detail/2',
  },
  {
    id: 3,
    title: '플레이스 이름4',
    tags: ['좋아요', '깨끗해요', '친절해요'],
    price: {
      small: 30000,
      middle: 40000,
      large: 50000,
    },
    rate: 3,
    reviewNumber: 31,
    src: '/images/place-ex.jpg',
    address: '서울 마포구',
    isActive: true,
    heartFill: true,
    starFill: true,
    path: '/place_detail/3',
  },
  {
    id: 4,
    title: '플레이스 이름5',
    tags: ['좋아요', '깨끗해요', '친절해요'],
    price: {
      small: 30000,
      middle: 40000,
      large: 50000,
    },
    rate: 4,
    reviewNumber: 12,
    src: '/images/place-ex.jpg',
    address: '서울 마포구',
    isActive: false,
    heartFill: false,
    starFill: true,
    path: '/place_detail/4',
  },
];

type PlaceSortType = '거리순' | '가격순' | '인기순';

export function Component() {
  const { dateRange, resetDateRange } = useDateRangeStore();
  const [placeSortType, setPlaceSortType] = useState<PlaceSortType | string>(
    '거리순'
  );
  const navigate = useNavigate();
  const hotPlaceContents = placeContent.map((item) => (
    <Link key={item.id} to={item.path}>
      <HotPlace {...item} />
    </Link>
  ));

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
    <StyledMainContainer>
      <A11yHidden as="h2" className="section-title">
        이벤트 배너
      </A11yHidden>
      <ImageSwiperContainer type="link" />

      <StyledMainSection $flexDirection="row" $flexGap={10}>
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
      </StyledMainSection>

      <StyledMainSection>
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
      </StyledMainSection>

      <StyledMainSection $flexDirection="column" $flexGap={20}>
        <h2 className="section-title">
          <span>플레이스 찾기</span>
          <DropDown current={placeSortType} setCurrent={setPlaceSortType} />
        </h2>
        <div className="section-content">
          {placeContent.map((item) => (
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
      </StyledMainSection>
    </StyledMainContainer>
  );
}
Component.displayName = 'Main';
