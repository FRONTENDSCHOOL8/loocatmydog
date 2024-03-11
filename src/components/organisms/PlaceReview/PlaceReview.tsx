import PlaceSection from '@/components/molecules/PlaceSection/PlaceSection';
import { styled } from 'styled-components';

const StyledPlaceReview = styled.div`
  & > p {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack};
    margin-bottom: 15px;
  }
  margin-bottom: 30px;
`;
const StyledPhotoList = styled.div`
  display: flex;
  gap: 10px;
`;
const StyledReviewPhoto = styled.figure`
  inline-size: 22%;
  aspect-ratio: 1/1;
  border-radius: 4px;
  overflow: hidden;
`;

const ReviewPhoto = () => {
  return (
    <StyledReviewPhoto>
      <img />
    </StyledReviewPhoto>
  );
};

const PlaceReview = () => {
  return (
    <StyledPlaceReview>
      <p>리뷰 2개</p>
      <StyledPhotoList></StyledPhotoList>
    </StyledPlaceReview>
  );
};

export default PlaceReview;
