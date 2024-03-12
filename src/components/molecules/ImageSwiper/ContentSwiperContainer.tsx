import styled, { RuleSet } from 'styled-components';
import { register } from 'swiper/element/bundle';
import HeartButton from '@/components/atoms/HeartButton/HeartButton';
import React from 'react';

interface SwiperParams {
  [key: string]: string | number | boolean;
}
interface ContentSwiperContainerProps {
  contents: React.JSX.Element[];
  swiperParams: SwiperParams;
  styles?: RuleSet<object>;
}

interface StyledContentSwiperContainerProps {
  $styles?: ContentSwiperContainerProps['styles'];
}

const StyledContentSwiperContainer = styled.div<StyledContentSwiperContainerProps>`
  inline-size: 100%;

  .swiper-container {
    inline-size: 100%;
  }

  .swiper-slide {
    inline-size: 100%;
  }
`;

register();

const componentContents = [
  <HeartButton key="0" id="0" />,
  <HeartButton key="1" id="1" />,
  <HeartButton key="2" id="2" />,
];

const defaultSwiperParams: SwiperParams = {
  direction: 'horizontal',
};

const ContentSwiperContainer = ({
  contents = componentContents,
  swiperParams = defaultSwiperParams,
  styles,
}: ContentSwiperContainerProps) => {
  return (
    <StyledContentSwiperContainer $styles={styles}>
      <swiper-container className="swiper-container" {...swiperParams}>
        {contents.map((content, index) => (
          <swiper-slide className="swiper-slide" key={index}>
            {content}
          </swiper-slide>
        ))}
      </swiper-container>
    </StyledContentSwiperContainer>
  );
};

export default ContentSwiperContainer;
