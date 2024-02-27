import { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

interface BigPhotoProps {
  type: 'default' | 'picture';
  imgSrc: string;
  size: {
    block: number;
    inline: number;
  };
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface StyledBigPhotoProps {
  $type: 'default' | 'picture';
  $size: {
    block: number;
    inline: number;
  };
}

const StyledBigPhoto = styled.button<StyledBigPhotoProps>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: 0px;

  ${(props) => {
    const { inline, block } = props.$size;

    return css`
      inline-size: ${inline}px;
      block-size: ${block}px;
    `;
  }}
  ${(props) => {
    if (props.$type === 'picture') {
      return css`
        & img {
          block-size: 100%;
          inline-size: 100%;
          object-fit: cover;
        }
      `;
    }
  }}
`;

const BigPhoto = ({
  type = 'default',
  imgSrc = '',
  size = { inline: 320, block: 142 },
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
    <StyledBigPhoto $type={type} $size={size} type="button" onClick={onClick}>
      {BigPhotoImage}
    </StyledBigPhoto>
  );
};

export default BigPhoto;
