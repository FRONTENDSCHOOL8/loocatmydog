// import { Swiper } from 'swiper/react';
// import styled from 'styled-components';
// import 'swiper/css';
// import BigPhoto from '@/components/atoms/BigPhoto/BigPhoto';
// import ImageSwiperSlide from './ImageSwiperSlide';

// interface ImageSwiperContainerProps {
//   imageUrls?: string[];
// }

// const StyledSwiper = styled(Swiper)`
//   width: 100%;
//   height: 160px;
// `;

// const TestImageUrls = [
//   '/images/story_sample1.jpg',
//   '/images/story_sample2.jpg',
//   '/images/story_sample3.jpg',
//   '/images/story_sample4.jpg',
// ];

// const ImageSwiperContainer = ({
//   imageUrls = TestImageUrls,
// }: ImageSwiperContainerProps) => {
//   return (
//     <StyledSwiper spaceBetween={0} slidesPerView={1}>
//       {imageUrls.map((url, index) => (
//         <ImageSwiperSlide key={index} url={url} type="picture">
//           <BigPhoto imgSrc={url} type="picture" />
//         </ImageSwiperSlide>
//       ))}
//     </StyledSwiper>
//   );
// };

// export default ImageSwiperContainer;

// import { useRef, useEffect } from 'react';
// import { register, SwiperContainer, SwiperSlide } from 'swiper/element/bundle';

// register();

// const ImageSwiperContainer = () => {
//   const swiperElRef = useRef(null);

//   useEffect(() => {
//     // listen for Swiper events using addEventListener
//     swiperElRef?.current?.addEventListener(
//       'swiperprogress',
//       (e: MouseEvent) => {
//         const [swiper, progress] = e.detail;
//         console.log(progress);
//       }
//     );

//     swiperElRef.current.addEventListener('swiperslidechange', (e) => {
//       console.log('slide changed');
//     });
//   }, []);

//   return (
//     <swiper-container
//       ref={swiperElRef}
//       slides-per-view="3"
//       navigation={true}
//       pagination={true}
//     >
//       <swiper-slide>Slide 1</swiper-slide>
//       <swiper-slide>Slide 2</swiper-slide>
//       <swiper-slide>Slide 3</swiper-slide>
//     </swiper-container>
//   );
// };

// export default ImageSwiperContainer;

// 직접 만들기

import styled from 'styled-components';
import { getRefValue, useStateRef } from './hooks';
import React, { useRef, useState } from 'react';
import { getTouchEventData } from './dom';

const SwiperContainer = styled.div`
  inline-size: 100%;
  max-inline-size: 100%;
  overflow: hidden;
  touch-action: pan-y;

  .swiping {
    transition: none;
  }
`;

const SwiperList = styled.ul`
  min-inline-size: 100%;
  display: flex;
  flex-flow: row;
  transition: transform 0.3s ease-out;
`;

const SwiperItem = styled.li`
  inline-size: 100%;
  flex-shrink: 0;
`;

const SwiperImage = styled.img`
  max-inline-size: 100%;
  block-size: auto;
  user-select: none;
`;

///
interface ImageSwiperContainerProps {
  imageUrls?: string[];
}

const TestImageUrls = [
  '/images/story_sample1.jpg',
  '/images/story_sample2.jpg',
  '/images/story_sample3.jpg',
  '/images/story_sample4.jpg',
];

const ImageSwiperContainer = ({
  imageUrls = TestImageUrls,
}: ImageSwiperContainerProps) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const containerWidthRef = useRef(0);
  const minOffsetXRef = useRef(0);
  const currentOffsetXRef = useRef(0);
  const startXRef = useRef(0);

  const [isSwiping, setIsSwiping] = useState(false);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentX = getTouchEventData(e).clientX;
    const diff = getRefValue(startXRef) - currentX;
    let newOffsetX = getRefValue(currentOffsetXRef) - diff;

    const maxOffsetX = 0;
    const minOffsetX = getRefValue(minOffsetXRef);

    if (newOffsetX > maxOffsetX) {
      newOffsetX = 0;
    }

    if (newOffsetX < minOffsetX) {
      newOffsetX = minOffsetX;
    }

    setOffsetX(newOffsetX);
  };

  const onTouchEnd = () => {
    const containerWidth = getRefValue(containerWidthRef);
    let newOffsetX = getRefValue(offsetXRef);
    newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth;

    setIsSwiping(false);
    setOffsetX(newOffsetX);

    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchEnd);
  };

  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    setIsSwiping(true);
    // e.clientX 마우스 x 포지션
    currentOffsetXRef.current = getRefValue(offsetXRef);
    startXRef.current = getTouchEventData(e).clientX;

    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl.offsetWidth;

    containerWidthRef.current = containerWidth;
    minOffsetXRef.current = containerEl.offsetWidth - containerEl.scrollWidth;

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);
  };

  return (
    <SwiperContainer onTouchStart={onTouchStart} onMouseDown={onTouchStart}>
      <SwiperList
        ref={containerRef}
        className={`${isSwiping ? 'swiping' : ''}`}
        style={{ transform: `translate3d(${offsetX}px, 0, 0)` }}
      >
        {imageUrls.map((url, index) => (
          <SwiperItem key={index}>
            <SwiperImage src={url} draggable={false} />
          </SwiperItem>
        ))}
      </SwiperList>
    </SwiperContainer>
  );
};

export default ImageSwiperContainer;
