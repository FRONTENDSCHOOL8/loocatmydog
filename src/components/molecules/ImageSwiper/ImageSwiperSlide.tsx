import styled from 'styled-components';
import BigPhoto from '@/components/atoms/BigPhoto/BigPhoto';
import { ChangeEventHandler } from 'react';

interface ImageSwiperSlideProps {
  url?: string;
  type: 'default' | 'picture' | 'link';
  link?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  [key: string]: any;
}

const StyledSwiperSlide = styled.div`
  inline-size: 100%;
`;

const testImageUrl = '/images/story_sample1.jpg';

const ImageSwiperSlide = ({
  url = testImageUrl,
  type = 'picture',
  link = '/',
  onChange,
}: ImageSwiperSlideProps) => {
  return (
    <StyledSwiperSlide>
      <BigPhoto type={type} imgSrc={url} link={link} onChange={onChange} />
    </StyledSwiperSlide>
  );
};

export default ImageSwiperSlide;
