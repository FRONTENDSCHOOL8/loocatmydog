interface StarRatingProps {
  fill?: boolean;
}

const StarRating = ({ fill = true, ...restProps }: StarRatingProps) => {
  let star;

  if (fill) {
    star = (
      <img
        src="/images/star-fill.svg"
        alt="노란색의 채워진 별"
        {...restProps}
      />
    );
  } else {
    star = (
      <img src="/images/star.svg" alt="노란색의 속이 빈 별" {...restProps} />
    );
  }

  return <>{star}</>;
};

export default StarRating;
