import { useRef, useEffect } from 'react';
import { register, SwiperContainer, SwiperSlide } from 'swiper/element/bundle';

register();

const ImageSwiperContainer = () => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef?.current?.addEventListener(
      'swiperprogress',
      (e: MouseEvent) => {
        const [swiper, progress] = e.detail;
        console.log(progress);
      }
    );

    swiperElRef.current.addEventListener('swiperslidechange', (e) => {
      console.log('slide changed');
    });
  }, []);

  return (
    <swiper-container
      ref={swiperElRef}
      slides-per-view="3"
      navigation={true}
      pagination={true}
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper-container>
  );
};

export default ImageSwiperContainer;
