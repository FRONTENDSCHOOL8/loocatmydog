import StarRating from '@/components/atoms/StarRating/StarRating';
import styled from 'styled-components';

interface HotPlaceProps {
  src: string;
  title: string;
  rate: number;
  reviewNumber: number;
  address: string;
}

const StyledHotPlace = styled.div`
  display: inline-block;
  inline-size: 100%;

  & figure img {
    margin-block-end: 10px;
    aspect-ratio: 16 / 10;
    border-radius: 8px;
    object-fit: cover;
  }

  & figcaption {
    ${(props) => props.theme.fontStyles.textMediumBase}
    color: ${(props) => props.theme.colors.textBlack};
  }

  & div {
    display: flex;
    flex-flow: row;
    column-gap: 3px;
    align-items: center;
  }

  & span {
    ${(props) => props.theme.fontStyles.textRegularSm}
    color: ${(props) => props.theme.colors.textDarkGray};
  }
`;

const HotPlace = ({
  src,
  title,
  rate,
  reviewNumber,
  address,
}: HotPlaceProps) => {
  return (
    <StyledHotPlace>
      <figure>
        <img src={src} alt="플레이스 소개 이미지" />
        <figcaption>{title}</figcaption>
      </figure>
      <div>
        {reviewNumber === 0 ? undefined : <StarRating fill />}
        {reviewNumber === 0 ? undefined : <span>{rate.toFixed(1)}</span>}
        <span>
          {' '}
          리뷰 {reviewNumber}개 · {address}
        </span>
      </div>
    </StyledHotPlace>
  );
};

export default HotPlace;
