import StarRating from '@/components/atoms/StarRating/StarRating';
import styled from 'styled-components';

interface HotPlaceProps {
  src: string;
  size: number;
  title: string;
  rate: number;
  reviewNumber: number;
  address: string;
}

interface StyledHotPlaceProps {
  $size: number;
}

const StyledHotPlace = styled.div<StyledHotPlaceProps>`
  display: inline-block;

  & figure img {
    margin-block-end: 10px;
    inline-size: ${(props) => props.$size + '%'};
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
  size,
  title,
  rate,
  reviewNumber,
  address,
}: HotPlaceProps) => {
  return (
    <StyledHotPlace $size={size}>
      <figure>
        <img src={src} />
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
