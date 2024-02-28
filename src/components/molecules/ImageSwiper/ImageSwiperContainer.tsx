import styled from 'styled-components';
import { Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import ImageSwiperSlide from './ImageSwiperSlide';

// swiper style
import 'swiper/css/bundle';

interface ImageSwiperContainerProps {
  imageUrls?: string[];
}

const StyledSwiper = styled(Swiper)`
  border: 2px solid black;
  inline-size: 100%;
  /* block-size: 160px; */
`;

const TestImageUrls = [
  '/images/story_sample1.jpg',
  '/images/story_sample2.jpg',
  '/images/story_sample3.jpg',
  '/images/story_sample4.jpg',
];

const ImageSwiperContainer = ({
  imageUrls = TestImageUrls,
}: ImageSwiperContainerProps) => {
  return (
    <StyledSwiper
      modules={[Navigation]}
      spaceBetween={10}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {imageUrls.map((url, index) => (
        <ImageSwiperSlide key={index} url={url} type="picture" />
      ))}
    </StyledSwiper>
  );
};

export default ImageSwiperContainer;
