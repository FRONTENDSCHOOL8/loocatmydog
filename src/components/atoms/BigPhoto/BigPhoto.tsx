import { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

interface BigPhotoProps {
  type?: 'default' | 'picture';
  imgSrc?: string;
  block?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface StyledBigPhotoProps {
  $type: 'default' | 'picture';
  $block: number;
}

const StyledBigPhoto = styled.button<StyledBigPhotoProps>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: 0px;

  position: relative;
  overflow: hidden;

  inline-size: 100%;

  ${(props) => {
    const block = props.$block;

    return css`
      block-size: ${block}px;
    `;
  }}

  ${(props) => {
    if (props.$type === 'picture') {
      return css`
        & img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `;
    }
  }}
`;

const BigPhoto = ({
  type = 'default',
  imgSrc = '/images/story_sample1.jpg',
  block = 160,
  onClick,
}: BigPhotoProps) => {
  const imgSource = <img src={imgSrc} alt="" />;

  let BigPhotoImage;

  switch (type) {
    case 'picture':
      BigPhotoImage = imgSource;
      break;

    case 'default':
      BigPhotoImage = (
        <>
          <span>사진을 추가해주세요.</span>
          <img src="/images/plusButton.svg" alt="+" />
        </>
      );
      break;
  }

  return (
    <StyledBigPhoto $type={type} $block={block} type="button" onClick={onClick}>
      {BigPhotoImage}
    </StyledBigPhoto>
  );
};

export default BigPhoto;
