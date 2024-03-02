import styled from 'styled-components';
import { register } from 'swiper/element/bundle';
import ImageSwiperSlide from './ImageSwiperSlide';
import { ChangeEventHandler } from 'react';

/*
  type
    - default
      - input으로 파일을 받아올 배열을 imgUrls에 전달
      - input onChange 이벤트 연결 필요
    - picture
      - 사진 src 값이 들은 배열 필요
    - link
      - 클릭 시 이동할 링크 link 값에 전달 필요
*/

interface ImageSwiperContainerProps {
  type: 'default' | 'picture' | 'link';
  link?: string;
  imageUrls?: string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  [key: string]: any;
}

const StyledImageSwiperContainer = styled.div`
  .swiper-container {
    inline-size: 100%;
    block-size: 160px;
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
  link = '/',
  type = 'picture',
  onChange,
  ...restProps
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
    <StyledImageSwiperContainer {...restProps}>
      <swiper-container
        className="swiper-container"
        {...swiperParams}
        style={{ ...swiperStyle }}
      >
        {imageUrls.map((url, index) => (
          <swiper-slide key={index}>
            <ImageSwiperSlide
              type={type}
              url={url}
              link={link}
              onChange={onChange}
            />
          </swiper-slide>
        ))}
        {ImageAddSlide}
      </swiper-container>
    </StyledImageSwiperContainer>
  );
};

export default ImageSwiperContainer;
