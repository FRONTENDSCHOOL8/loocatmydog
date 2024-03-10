import styled, { CSSProperties } from 'styled-components';
import { register } from 'swiper/element/bundle';
import ImageSwiperSlide from './ImageSwiperSlide';
import React, { ChangeEventHandler } from 'react';

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
    aspect-ratio: 2/1;
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
  link = '/events',
  type = 'picture',
  onChange,
  ...restProps
}: ImageSwiperContainerProps) => {
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
        direction="horizontal"
        slides-per-view="1"
        pagination={{ clickable: true }}
        style={{ ...swiperStyle } as React.CSSProperties}
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
