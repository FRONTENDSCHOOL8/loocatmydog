import StarRating from '@/components/atoms/StarRating/StarRating';
import styled from 'styled-components';
import StateBadge from './../../atoms/StateBadge/StateBadge';
import HeartButton from '@/components/atoms/HeartButton/HeartButton';
import React from 'react';
import { comma, toggleBookmark } from '@/utils';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import ImageSwiperContainer from '../ImageSwiper/ImageSwiperContainer';
import { register } from 'swiper/element/bundle';

register();

interface PlaceProps {
  id: string;
  src: string[];
  title: string;
  rate: number;
  reviewNumber: number;
  address: string;
  price: number;
  isActive: boolean;
  path: string;
}
const StylePlaceContainer = styled.div`
  position: relative;
  inline-size: 100%;
  aspect-ratio: 1.11/1;
  border-radius: 8px;
  padding: 3px;
  &:hover {
    background-color: ${(props) => props.theme.colors.orangeBg};
  }

  & > .heart-container {
    position: absolute;
    top: 10px;
    right: 9px;
    z-index: 10;
  }
`;
const StyledPlace = styled(Link)`
  inline-size: 100%;
  block-size: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  row-gap: 10px;
  &:hover {
    text-decoration: none;
  }

  & .title {
    ${(props) => props.theme.fontStyles.textMediumBase};
  }

  & .reviewWrapper {
    display: flex;
    flex-flow: row;
    column-gap: 3px;
    align-items: center;

    & span {
      ${(props) => props.theme.fontStyles.textRegularSm}
      color: ${(props) => props.theme.colors.textDarkGray};
    }
  }

  & .priceWrapper {
    display: flex;
    flex-flow: row;
    column-gap: 10px;
    align-items: center;

    & .span-price {
      ${(props) => props.theme.fontStyles.textSemiboldBase}
      color: ${(props) => props.theme.colors.textBlack};
    }
  }
`;

const Place = ({
  id,
  src,
  title,
  rate,
  reviewNumber,
  address,
  price,
  isActive,
  path,
}: PlaceProps) => {
  return (
    <StylePlaceContainer>
      <StyledPlace to={path}>
        {/* 이미지 스와이퍼 */}
        <ImageSwiper imageArray={src} />

        {/* 플레이스 타이틀 & 리뷰 */}
        <div className="title">
          <p>{title}</p>
          <div className="reviewWrapper">
            {reviewNumber === 0 ? undefined : (
              <StarRating fill={true} count={1} />
            )}
            {reviewNumber === 0 ? undefined : <span>{rate.toFixed(1)}</span>}
            <span>
              리뷰 {reviewNumber}개 · {address}
            </span>
          </div>
        </div>

        {/* 플레이스 가격 */}
        <div className="priceWrapper">
          <StateBadge isActive={isActive} mode="normal" />
          <span className="span-price">{comma(price)}원</span>
        </div>
      </StyledPlace>
      <HeartButton id={id} />
    </StylePlaceContainer>
  );
};
export default Place;

const StyledSwiperWrapper = styled.div`
  inline-size: 100%;
  flex: 1;

  & swiper-container {
    inline-size: 100%;
    block-size: 100%;
    margin: 0;
    border-radius: 8px;
    overflow: hidden;

    & swiper-slide {
      inline-size: 100%;
      block-size: 100%;

      & img {
        inline-size: 100%;
        aspect-ratio: 1.4/1;
        object-fit: cover;
        border-radius: 8px;
      }
    }
  }

  & .swiper-image {
  }
`;

const ImageSwiper = ({ imageArray = [] }: { imageArray: string[] }) => {
  const swiperStyle = { '--swiper-pagination-color': '#fff' };
  return (
    <StyledSwiperWrapper>
      <swiper-container
        direction="horizontal"
        slides-per-view="1"
        pagination={true}
        style={{ ...swiperStyle } as React.CSSProperties}
      >
        {imageArray.map((item, idx) => {
          return (
            <swiper-slide key={idx}>
              <img className="swiper-image" src={item} alt="" />
            </swiper-slide>
          );
        })}
      </swiper-container>
    </StyledSwiperWrapper>
  );
};
