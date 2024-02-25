import React from 'react';
import styled from 'styled-components';

interface ProfileWrapperProps {
  $inlineSize: number;
  $blockSize: number;
}

const ProfileWrapper = styled.div<ProfileWrapperProps>`
  border-radius: 70%;
  overflow: hidden;
  inline-size: ${(props) => props.$inlineSize}px;
  block-size: ${(props) => props.$blockSize}px;
`;

interface ProfileImageProps {
  widthHeight: { blockSize: number; inlineSize: number };
}

const ProfileImg = styled.img.attrs((props) => ({
  src: props.src,
}))`
  block-size: 100%;
  inline-size: 100%;
  object-fit: cover;
`;

const ProfileImage: React.FC<ProfileImageProps> = ({ widthHeight }) => {
  const { blockSize = 40, inlineSize = 40 } = widthHeight;
  return (
    <ProfileWrapper $blockSize={blockSize} $inlineSize={inlineSize}>
      <ProfileImg src={'/images/Star.svg'} alt="프로필" />
    </ProfileWrapper>
  );
};

export default ProfileImage;
