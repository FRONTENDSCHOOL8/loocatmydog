import StarRating from '@/components/atoms/StarRating/StarRating';
import styled from 'styled-components';
import StateBadge from './../../atoms/StateBadge/StateBadge';
import HeartButton from '@/components/atoms/HeartButton/HeartButton';
import { MouseEventHandler } from 'react';
import { comma } from '@/utils';

interface PlaceProps {
  src: string;
  title: string;
  rate: number;
  reviewNumber: number;
  address: string;
  price: number;
  isActive: boolean;
  starFill: boolean;
  heartFill: boolean;
  onChangeHeartButton: MouseEventHandler<HTMLButtonElement>;
}

const StyledPlace = styled.div`
  inline-size: 100%;
  display: inline-block;

  & figure img {
    margin-block-end: 0.625rem;
    /* inline-size: 100%; */
    aspect-ratio: 16 / 10;
    border-radius: 8px;
    object-fit: cover;
    ${(props) => props.theme.fontStyles.textMediumBase}
    color: ${(props) => props.theme.colors.textBlack};
  }

  & figcaption {
    ${(props) => props.theme.fontStyles.textMediumBase}
    color: ${(props) => props.theme.colors.textBlack};
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
  src,
  title,
  rate,
  reviewNumber,
  address,
  price,
  isActive,
  starFill,
  heartFill,
  onChangeHeartButton,
}: PlaceProps) => {
  return (
    <StyledPlace>
      <div className="imageWrapper">
        <figure>
          <img src={src} alt="플레이스 소개 이미지" />
          <figcaption>{title}</figcaption>
        </figure>
        <HeartButton fill={heartFill} onClick={onChangeHeartButton} />
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
        <StateBadge isActive={isActive} mode="normal" />
        <span className="span-price">{comma(price)}원</span>
      </div>
    </StyledPlace>
  );
};

export default Place;
