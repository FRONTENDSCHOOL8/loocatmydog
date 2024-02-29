import { ChangeEventHandler, MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps {
  imgSrc?: string;
  totalImageNum?: Number;
  currentImageNum?: Number;
  type: 'default' | 'picture' | 'total';
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

export interface StyledButtonProps {
  $type: 'default' | 'picture' | 'total';
}

const StyledPhotoButton = styled.div<StyledButtonProps>`
  block-size: ${(props) => (props.$type === 'total' ? '40px' : '62px')};
  inline-size: ${(props) => (props.$type === 'total' ? '40px' : '62px')};

  border: 1px solid;
  border-color: ${(props) => props.theme.colors.lineColorGray};
  border-radius: 8px;
  background-color: white;
  ${(props) => props.theme.fontStyles.textRegularSm}
  overflow: hidden;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  ${(props) => {
    if (props.$type === 'picture') {
      return css`
        & div {
          inline-size: 100%;
          block-size: 100%;
          position: relative;
        }

        .photo {
          block-size: 100%;
          inline-size: 100%;
          object-fit: cover;
          filter: brightness(0.75);
        }

        & button {
          position: absolute;
          top: 5px;
          right: 5px;
          z-index: 1;
          inline-size: 10px;
          block-size: 10px;
        }
      `;
    }
  }}

  & label {
    cursor: pointer;
  }

  #addPhoto {
    display: none;
  }
`;

/* 
  type 설명
  - default
    - onChange 이벤트에 이미지 값 저장하는 법 연결

  - picture
    - onClick 이벤트에 이미지 삭제 이벤트 연결
    - imgSrc 값에 해당 이미지 주소 값 넣기

  - total 
    - 현재 개수 / 최대 개수 (4)
*/

const Photo = ({
  type = 'default',
  imgSrc = '/images/story_sample1.jpg',
  totalImageNum = 4,
  currentImageNum = 0,
  onChange,
  onClick,
  ...restProps
}: ButtonProps) => {
  let PhotoImage;

  switch (type) {
    case 'default':
      PhotoImage = (
        <div>
          <label htmlFor="addPhoto">
            <img src="/images/cameraIcon.svg" alt="카메라 아이콘" />
          </label>
          <input
            type="file"
            name="addPhoto"
            id="addPhoto"
            onChange={onChange}
          />
        </div>
      );
      break;
    case 'picture':
      PhotoImage = (
        <div>
          <button type="button" onClick={onClick}>
            <img src="/images/xIcon.svg" alt="삭제" />
          </button>
          <img className="photo" src={imgSrc} alt="" />
        </div>
      );
      break;
    case 'total':
      PhotoImage = (
        <>
          <span>사진</span>
          <span>
            {`${currentImageNum}`}/{`${totalImageNum}`}
          </span>
        </>
      );
      break;
  }

  return (
    <StyledPhotoButton $type={type} {...restProps}>
      {PhotoImage}
    </StyledPhotoButton>
  );
};

export default Photo;
