import styled from 'styled-components';

interface StarRatingProps {
  fill?: boolean;
  count?: number;
}

const StyledStarRating = styled.div`
  display: flex;
`;

const StarRating = ({
  fill = true,
  count = 1,
  ...restProps
}: StarRatingProps) => {
  const info = {
    src: fill === true ? '/images/star-fill.svg' : '/images/star.svg',
    alt: fill === true ? '노란색의 채워진 별' : '노란색의 속이 빈 별',
  };

  const starArray = new Array(count).fill(info);
  const star = starArray.map((info, index) => (
    <img src={info.src} alt={info.alt} key={index} {...restProps} />
  ));

  return <StyledStarRating>{star}</StyledStarRating>;
};

export default StarRating;
