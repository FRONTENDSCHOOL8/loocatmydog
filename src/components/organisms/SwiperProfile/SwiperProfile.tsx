import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import ImageSwiperContainer from '@/components/molecules/ImageSwiper/ImageSwiperContainer';
import ImageSwiperSlide from '@/components/molecules/ImageSwiper/ImageSwiperSlide';
import getPbImageURL from '@/utils/getPbImageURL';
import styled from 'styled-components';

const StyledSwiperProfileContainer = styled.div`
  position: relative;
  & .profileBox {
    z-index: 1;
    position: relative;
    top: -20px;
    left: 10px;
  }
`;
const StyleUserProfileIcon = styled.div``;
const SwiperProfile = ({ data }: { data: any }) => {
  const placeUser = data.expand.userId;

  // 플레이스 상세 이미지
  const collectionId = data.collectionId;
  const id = data.id;
  const photoData = data.photo;
  const imageUrlContainer = photoData.map((data: string) =>
    getPbImageURL(collectionId, id, data)
  );

  return (
    <StyledSwiperProfileContainer>
      <ImageSwiperContainer type={'picture'} imageUrls={imageUrlContainer} />
      <div className="profileBox">
        {placeUser.avatar ? (
          <ProfileImage
            src={getPbImageURL(
              placeUser.collectionId,
              placeUser.id,
              placeUser.avatar
            )}
            style={{ border: '2px solid #f1f1f1', backgroundColor: '#fff' }}
          />
        ) : (
          <ProfileImage style={{ border: '2px solid #f1f1f1' }} />
        )}
      </div>
    </StyledSwiperProfileContainer>
  );
};

export default SwiperProfile;
