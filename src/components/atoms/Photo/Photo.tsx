import { MouseEventHandler } from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  imgSrc?: string;
  totalImgaeNum?: Number;
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

  & img {
    block-size: 100%;
    inline-size: 100%;
    object-fit: cover;
  }
`;

const CameraIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
      stroke="#FFB62B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
      stroke="#FFB62B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Photo = ({
  type = 'default',
  imgSrc = '',
  totalImgaeNum = 4,
  currentImageNum = 1,
  onClick,
}: ButtonProps) => {
  const imgSource = <img src={imgSrc} alt="" />;

  let PhotoImage;

  switch (type) {
    case 'default':
      PhotoImage = CameraIcon;
      break;
    case 'picture':
      PhotoImage = imgSource;
      break;
    case 'total':
      PhotoImage = `사진 ${currentImageNum}/${totalImgaeNum}`;
      break;
  }

  return (
    <StyledPhotoButton $type={type} onClick={onClick}>
      {PhotoImage}
    </StyledPhotoButton>
  );
};

export default Photo;
