interface StarRatingProps {
  fill?: boolean;
}

const StarRating = ({ fill }: StarRatingProps) => {
  let star;

  if (fill) {
    star = <img src="/images/star-fill.svg" />;
  } else {
    star = <img src="/images/star.svg" />;
  }

  return <>{star}</>;
};

export default StarRating;
