import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';
import BigPhoto from '@/components/atoms/BigPhoto/BigPhoto';

interface ImageSwiperSlideProps {
  url: string;
  type: 'default' | 'picture';
  [key: string]: any;
}

const StyledSwiperSlide = styled(SwiperSlide)`
  inline-size: 100%;
  block-size: 160px;
  border: 1px solid pink;
`;

const testImageUrl = '/images/story_sample1.jpg';

const ImageSwiperSlide = ({
  url = testImageUrl,
  type = 'picture',
}: ImageSwiperSlideProps) => {
  return (
    <StyledSwiperSlide>
      <BigPhoto imgSrc={url} type={type} />
    </StyledSwiperSlide>
  );
};

export default ImageSwiperSlide;
