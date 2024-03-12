import PlaceSection from '@/components/molecules/PlaceSection/PlaceSection';
import getPbImageURL from '@/utils/getPbImageURL';
import { styled } from 'styled-components';

//type 지정
interface ReviewPhotoProps {
  src: string;
  alt: string;
}

const StyledPlaceReview = styled.div`
  padding: 0 20px;
  & > p {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack};
    margin-bottom: 15px;
  }
  margin-bottom: 30px;
`;
const StyledPhotoList = styled.div`
  display: flex;
  gap: 3%;
  & > p {
    ${(props) => props.theme.fontStyles.textRegularMd}
    color: ${(props) => props.theme.colors.textDarkGray};
  }
`;
const StyledReviewPhoto = styled.figure`
  inline-size: 22%;
  aspect-ratio: 1/1;
  border-radius: 4px;
  overflow: hidden;
`;

const ReviewPhoto = ({ src, alt }: ReviewPhotoProps) => {
  return (
    <StyledReviewPhoto>
      <img src={src} alt={alt} />
    </StyledReviewPhoto>
  );
};

const PlaceReview = ({ data }: { data: any }) => {
  console.log(data.expand['boards(placeId)']);
  const reviewList = data.expand['boards(placeId)'];
  // const imgList = [];
  // reviewList?.map((item) => {
  //   if (item.photo) {
  //     imgList.push({ id: item.id, photo: item.photo });
  //   }
  //   imgList.push(...item.photo);
  // });
  // function photoRendering() {}
  // console.log(imgList);

  return (
    <StyledPlaceReview>
      <p>
        후기{' '}
        {data.expand['boards(placeId)']
          ? data.expand['boards(placeId)'].length
          : 0}
        개
      </p>
      <StyledPhotoList>
        {data.expand['boards(placeId)'] ? (
          <>
            <ReviewPhoto src="/images/story_sample1.jpg" alt="강아지" />
            <ReviewPhoto src="/images/story_sample1.jpg" alt="강아지" />
            <ReviewPhoto src="/images/story_sample1.jpg" alt="강아지" />
            <ReviewPhoto src="/images/story_sample1.jpg" alt="강아지" />
          </>
        ) : (
          <p>등록된 후기가 없습니다</p>
        )}
      </StyledPhotoList>
    </StyledPlaceReview>
  );
};

export default PlaceReview;
