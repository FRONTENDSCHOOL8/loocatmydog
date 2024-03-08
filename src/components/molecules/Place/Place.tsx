import StarRating from '@/components/atoms/StarRating/StarRating';
import styled from 'styled-components';
import StateBadge from './../../atoms/StateBadge/StateBadge';
import HeartButton from '@/components/atoms/HeartButton/HeartButton';
import React, { MouseEventHandler } from 'react';
import { comma } from '@/utils';
import { Link } from 'react-router-dom';
import addBookmark from '@/utils/addBookmark';
import { useAuthStore } from '@/store/useAuthStore';

interface PlaceProps {
  id: string;
  src: string;
  title: string;
  rate: number;
  reviewNumber: number;
  address: string;
  price: number;
  isActive: boolean;
  heartFill: boolean;
  path: string;
}
const StylePlaceContainer = styled.div`
  position: relative;
  & > button {
    position: absolute;
    top: 10px;
    right: 9px;
  }
`;
const StyledPlace = styled(Link)`
  inline-size: 100%;
  display: inline-block;
  &:hover {
    text-decoration: none;
  }

  & figure img {
    margin-block-end: 0.625rem;
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
  id,
  src,
  title,
  rate,
  reviewNumber,
  address,
  price,
  isActive,
  heartFill,
  path,
}: PlaceProps) => {
  const { user: myUserInfo } = useAuthStore();
  const handleClickHeartButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addBookmark(myUserInfo?.id, id);
  };
  return (
    <StylePlaceContainer>
      <StyledPlace to={path}>
        <div className="imageWrapper">
          <figure>
            <img src={src} alt="플레이스 소개 이미지" />
            <figcaption>{title}</figcaption>
          </figure>
        </div>
        <div className="reviewWrapper">
          {reviewNumber === 0 ? undefined : (
            <StarRating fill={true} count={1} />
          )}
          {reviewNumber === 0 ? undefined : <span>{rate.toFixed(1)}</span>}
          <span>
            리뷰 {reviewNumber}개 · {address}
          </span>
        </div>
        <div className="priceWrapper">
          <StateBadge isActive={isActive} mode="normal" />
          <span className="span-price">{comma(price)}원</span>
        </div>
      </StyledPlace>
      <HeartButton fill={heartFill} onClick={handleClickHeartButton} />
    </StylePlaceContainer>
  );
};

export default Place;
