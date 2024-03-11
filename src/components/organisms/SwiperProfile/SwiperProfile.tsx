import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import ImageSwiperSlide from '@/components/molecules/ImageSwiper/ImageSwiperSlide';
import getPbImageURL from '@/utils/getPbImageURL';
import styled from 'styled-components';

const StyledSwiperProfileContainer = styled.div`
  position: relative;
  & .profileBox {
    position: relative;
    top: -20px;
    left: 10px;
  }
`;
const StyleUserProfileIcon = styled.div``;
const SwiperProfile = ({ data }: { data: any }) => {
  const placeUser = data.expand.userId;
  return (
    <StyledSwiperProfileContainer>
      <ImageSwiperSlide url={'/images/story_sample1.jpg'} type="picture" />
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
