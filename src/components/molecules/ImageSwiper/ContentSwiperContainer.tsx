import styled from 'styled-components';
import { register } from 'swiper/element/bundle';
import HeartButton from '@/components/atoms/HeartButton/HeartButton';
import { ReactElement } from 'react';

interface ContentSwiperContainerProps {
  contents: ReactElement[];
  perView?: number;
  slideGap?: number;
}

const StyledContentSwiperContainer = styled.div`
  .swiper-container {
    inline-size: 100%;
    block-size: 160px;
  }

  & div {
    inline-size: 100%;
  }
`;

register();

const componentContents = [
  <HeartButton key={0} fill={true} />,
  <HeartButton key={1} fill={true} />,
  <HeartButton key={2} fill={true} />,
];

const ContentSwiperContainer = ({
  contents = componentContents,
  perView = 3,
  slideGap = 10,
}: ContentSwiperContainerProps) => {
  const swiperParams = {
    direction: 'horizontal',
    slidesPerView: perView,
    sapceBetween: 10,
  };

  return (
    <StyledContentSwiperContainer>
      <swiper-container className="swiper-container" {...swiperParams}>
        {contents.map((content, index) => (
          <swiper-slide className="swiper-slide" key={index}>
            <div>{content}</div>
          </swiper-slide>
        ))}
      </swiper-container>
    </StyledContentSwiperContainer>
  );
};

export default ContentSwiperContainer;
