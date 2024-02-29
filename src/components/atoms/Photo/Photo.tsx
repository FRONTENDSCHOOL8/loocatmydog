import { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps {
  imgSrc?: string;
  totalImageNum?: Number;
  currentImageNum?: Number;
  type: 'default' | 'picture' | 'total';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface StyledButtonProps {
  $type: 'default' | 'picture' | 'total';
}

const StyledPhotoButton = styled.button<StyledButtonProps>`
  block-size: ${(props) => (props.$type === 'total' ? '40px' : '62px')};
  inline-size: ${(props) => (props.$type === 'total' ? '40px' : '62px')};

  border: 1px solid #f1f1f1;
  border-radius: 8px;
  background-color: white;
  font-size: 10px;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

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

const Photo = ({
  type = 'default',
  imgSrc = '',
  totalImageNum = 4,
  currentImageNum = 0,
  onClick,
}: ButtonProps) => {
  const imgSource = <img src={imgSrc} alt="" />;

  let PhotoImage;

  switch (type) {
    case 'default':
      PhotoImage = <img src="/images/cameraIcon.svg" alt="카메라 아이콘" />;
      break;
    case 'picture':
      PhotoImage = imgSource;
      break;
    case 'total':
      PhotoImage = (
        <>
          <span>사진</span>
          <span>
            {`${currentImageNum}`} / {`${totalImageNum}`}
          </span>
        </>
      );
      break;
  }

  return (
    <StyledPhotoButton $type={type} type="button" onClick={onClick}>
      {PhotoImage}
    </StyledPhotoButton>
  );
};

export default Photo;
