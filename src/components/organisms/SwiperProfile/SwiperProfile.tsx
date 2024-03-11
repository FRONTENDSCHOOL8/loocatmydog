import ImageSwiperSlide from '@/components/molecules/ImageSwiper/ImageSwiperSlide';
import getPbImageURL from '@/utils/getPbImageURL';
import styled from 'styled-components';

const StyledSwiperProfileContainer = styled.div``;
const StyleUserProfileIcon = styled.div``;
const SwiperProfile = () => {
  return (
    <StyledSwiperProfileContainer>
      <ImageSwiperSlide type="picture" imgSrc={''}></ImageSwiperSlide>
      <div>
        <StyleUserProfileIcon />
      </div>
    </StyledSwiperProfileContainer>
  );
};

export default SwiperProfile;
