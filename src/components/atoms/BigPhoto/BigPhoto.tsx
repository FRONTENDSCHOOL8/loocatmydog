import { ChangeEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface BigPhotoProps {
  type?: 'default' | 'picture' | 'link';
  link?: string;
  imgSrc?: string;
  block?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  [key: string]: any;
}

interface StyledBigPhotoProps {
  $type?: 'default' | 'picture' | 'link';
  $block?: number;
}

const StyledBigPhoto = styled.div<StyledBigPhotoProps>`
  position: relative;
  overflow: hidden;

  inline-size: 100%;
  aspect-ratio: 2 / 1;

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
    background-color: ${(props) => props.theme.colors.gray100};

    ${(props) => {
      const block = props.$block;

      return css`
        block-size: ${block}px;
      `;
    }}

    & label {
      cursor: pointer;
    }

    #addImg {
      display: none;
    }
  }
`;
/* 
  - default : 사진 등록 input
  - picture : 사진 표시 ( 클릭 시 새창에 사진 보여주기 )
  - link : 사진 클릭 시 페이지 이동 ( Link )
*/

const BigPhoto = ({
  type = 'default',
  link = '/',
  imgSrc = '/images/story_sample1.jpg',
  block = 160,
  onChange,
  ...restProps
}: BigPhotoProps) => {
  let BigPhotoImage;

  switch (type) {
    case 'default':
      BigPhotoImage = (
        <div>
          <span>사진을 추가해주세요.</span>
          <label htmlFor="addImg">
            <img src="/images/plusButton.svg" alt="+" />
          </label>
          <input type="file" name="addImg" id="addImg" onChange={onChange} />
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
          <img src={imgSrc} alt="" />
        </Link>
      );
      break;
  }

  return (
    <StyledBigPhoto $type={type} $block={block} {...restProps}>
      {BigPhotoImage}
    </StyledBigPhoto>
  );
};

export default BigPhoto;
