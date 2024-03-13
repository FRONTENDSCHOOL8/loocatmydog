import pb from '@/api/pocketbase';
import useModalControlStore from '@/store/useModalControl';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledDimmed = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 50%;
  translate: -50% 0%;
  inline-size: 100%;
  min-inline-size: 280px;
  max-inline-size: 420px;
  block-size: 100dvh;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 99;
`;

const StyledEventPopupContainer = styled(motion.div)`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  position: absolute;
  bottom: 0;
  left: 50%;
  translate: -50% 0%;
  inline-size: 100%;
  min-inline-size: 280px;
  max-inline-size: 420px;
  max-block-size: 70dvh;
  background-color: ${(props) => props.theme.colors.white};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  z-index: 9999;

  & .image-container {
    flex: 1;
    inline-size: 100%;
    block-size: 100%;
    overflow: hidden;
    & > img {
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }
  }

  & .normal-close-button {
    inline-size: 100%;
    block-size: 50px;
    transition: background-color 0.2s;
    &:hover {
      background-color: ${(props) => props.theme.colors.gray300};
    }
  }

  & .day-close-button {
    position: absolute;
    top: -20px;
    right: 15px;
    ${(props) => props.theme.fontStyles.textRegularMd}
    color: ${(props) => props.theme.colors.white};
    padding-inline-start: 20px;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      inline-size: 14px;
      aspect-ratio: 1/1;
      background: url('/images/cross.svg') no-repeat center / 75%;
    }
  }
`;

const EventPopup = () => {
  const { setModal } = useModalControlStore();
  const [images, setImages] = useState<string[] | null>(null);

  let imageContents = null;
  if (images) imageContents = <img src={images[0]} alt="이벤트 배너" />;

  const handleNormalClose = () => {
    setModal('popup', false);
  };

  const handleDayClose = () => {
    localStorage.setItem(
      'lastPopupHideTime',
      JSON.stringify(new Date().getTime())
    );
    setModal('popup', false);
  };

  useEffect(() => {
    const getBannerImages = async () => {
      const response = await pb.from('events').getOne('xa406ln74v45u9v');
      const popupImageUrl = response.popupImages?.map((filename) =>
        pb.files.getUrl(response, filename, { thumb: '500x0' })
      );
      return popupImageUrl;
    };
    getBannerImages()
      .then((res) => setImages(res))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <StyledDimmed
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'linear' }}
      />
      <StyledEventPopupContainer
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'linear' }}
      >
        <div className="image-container">{imageContents}</div>
        <button
          className="normal-close-button"
          type="button"
          onClick={handleNormalClose}
        >
          닫기
        </button>
        <button
          className="day-close-button"
          type="button"
          onClick={handleDayClose}
        >
          24시간동안 보지 않기
        </button>
      </StyledEventPopupContainer>
    </>
  );
};

export default EventPopup;
