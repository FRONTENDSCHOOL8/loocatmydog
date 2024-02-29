import { ChangeEventHandler, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface BigPhotoProps {
  type?: 'default' | 'picture' | 'link';
  link?: string;
  imgSrc?: string;
  block?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

interface StyledBigPhotoProps {
  $type?: 'default' | 'picture' | 'link';
  $block?: number;
}

const StyledBigPhoto = styled.div<StyledBigPhotoProps>`
  position: relative;
  overflow: hidden;

  inline-size: 100%;

  ${(props) => {
    if (props.$type === 'picture' || props.$type === 'link') {
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

  & a, & div {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
    inline-size: 100%;

    ${(props) => {
      const block = props.$block;

      return css`
        block-size: ${block}px;
      `;
    }}

    & input {
    }
  }
`;

const StyledAddImageButton = styled.button<StyledBigPhotoProps>``;

const BigPhoto = ({
  type = 'default',
  link = '/',
  imgSrc = '/images/story_sample1.jpg',
  block = 160,
  onChange,
}: BigPhotoProps) => {
  const imgSource = <img src={imgSrc} alt="" />;

  let BigPhotoImage;

  switch (type) {
    case 'default':
      BigPhotoImage = (
        <div>
          <span>사진을 추가해주세요.</span>
          <input type="file" name="addImg" id="addImg" onChange={onChange} />
          {/* <img src="/images/plusButton.svg" alt="+" /> */}
        </div>
      );
      break;

    case 'picture':
      BigPhotoImage = (
        <a href={imgSrc} target="_blank" rel="noopener noreferrer">
          <img src={imgSrc} alt="" />
        </a>
      );
      break;

    case 'link':
      BigPhotoImage = (
        <Link to={link}>
          <a href={imgSrc} target="_blank" rel="noopener noreferrer">
            <img src={imgSrc} alt="" />
          </a>
        </Link>
      );
      break;
  }

  return (
    <StyledBigPhoto $type={type} $block={block}>
      {BigPhotoImage}
    </StyledBigPhoto>
  );
};

export default BigPhoto;
