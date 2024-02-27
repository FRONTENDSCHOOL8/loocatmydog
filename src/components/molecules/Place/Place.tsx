import StarRating from '@/components/atoms/StarRating/StarRating';
import styled from 'styled-components';
import StateBadge from './../../atoms/StateBadge/StateBadge';
import HeartButton from '@/components/atoms/HeartButton/HeartButton';
import { useEffect, useState } from 'react';

interface PlaceProps {
  src: string;
  title: string;
  rate: number;
  reviewNumber: number;
  address: string;
  isActive: boolean;
  starFill: boolean;
  heartFill: boolean;
}

interface StyledPlaceProps {}

const StyledPlace = styled.div<StyledPlaceProps>`
  display: inline-block;

  & figure img {
    margin-block-end: 0.625rem;
    inline-size: 100%;
    aspect-ratio: 16 / 10;
    border-radius: 8px;
    object-fit: cover;
  }

  & figcaption {
    ${(props) => props.theme.fontStyles.textMediumBase}
    color: ${(props) => props.theme.colors.textBlack};
  }

  & span {
    ${(props) => props.theme.fontStyles.textRegularSm}
    color: ${(props) => props.theme.colors.textDarkGray};
  }

  & .imageWrapper {
    position: relative;

    & button {
      position: absolute;
      top: 10px;
      right: 9px;
    }
  }

  & .reviewWrapper {
    display: flex;
    flex-flow: row;
    column-gap: 3px;
    margin-block-end: 10px;
    align-items: center;
  }

  & .priceWrapper {
    display: flex;
    flex-flow: row;
    column-gap: 10px;
    align-items: center;

    & span {
      ${(props) => props.theme.fontStyles.textSemiboldBase}
      color: ${(props) => props.theme.colors.textBlack};
    }
  }
`;

const Place = ({
  src,
  title,
  rate,
  reviewNumber,
  address,
  isActive,
  starFill,
  heartFill,
}: PlaceProps) => {
  const [isFill, setIsFill] = useState(heartFill);

  // 찜버튼 클릭 이벤트
  function handleHeartButton() {
    setIsFill(!isFill);
  }

  return (
    <StyledPlace>
      <div className="imageWrapper">
        <figure>
          <img src={src} />
          <figcaption>{title}</figcaption>
        </figure>
        <HeartButton fill={isFill} onClick={handleHeartButton} />
      </div>
      <div className="reviewWrapper">
        {reviewNumber === 0 ? undefined : <StarRating fill={starFill} />}
        {reviewNumber === 0 ? undefined : <span>{rate.toFixed(1)}</span>}
        <span>
          {' '}
          리뷰 {reviewNumber}개 · {address}
        </span>
      </div>
      <div className="priceWrapper">
        <StateBadge isActive={isActive} />
        <span>60000원</span>
      </div>
    </StyledPlace>
  );
};

export default Place;
