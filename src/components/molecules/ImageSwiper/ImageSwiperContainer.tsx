import styled from 'styled-components';
import { register } from 'swiper/element/bundle';
import ImageSwiperSlide from './ImageSwiperSlide';

interface ImageSwiperContainerProps {
  imageUrls?: string[];
  type: 'default' | 'picture' | 'link';
}

const StyledImageSwiperContainer = styled.div`
  .swiper-container {
    inline-size: 100%;
    block-size: 160px;
    background-color: lime;
  }

  & div {
    inline-size: 100%;
  }
`;

const TestImageUrls = [
  '/images/story_sample1.jpg',
  '/images/story_sample2.jpg',
  '/images/story_sample3.jpg',
  '/images/story_sample4.jpg',
];

register();

const ImageSwiperContainer = ({
  imageUrls = TestImageUrls,
  type = 'picture',
}: ImageSwiperContainerProps) => {
  const swiperParams = {
    direction: 'horizontal',
    slidesPerView: 1,
    pagination: {
      clickable: true,
    },
  };

  const ImageAddSlide =
    type === 'default' ? (
      <swiper-slide>
        <ImageSwiperSlide type={type} />
      </swiper-slide>
    ) : null;

  const swiperStyle = { '--swiper-pagination-color': 'brown' };

  return (
    <StyledImageSwiperContainer>
      <swiper-container
        className="swiper-container"
        {...swiperParams}
        style={{ ...swiperStyle }}
      >
        {imageUrls.map((url, index) => (
          <swiper-slide key={index}>
            <ImageSwiperSlide type={type} url={url} />
          </swiper-slide>
        ))}
        {ImageAddSlide}
      </swiper-container>
    </StyledImageSwiperContainer>
  );
};

export default ImageSwiperContainer;
