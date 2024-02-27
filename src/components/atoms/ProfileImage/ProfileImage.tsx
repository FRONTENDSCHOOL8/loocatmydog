import styled from 'styled-components';

interface ProfileWrapperProps {
  $inlineSize: number;
  $blockSize: number;
}

const StyledProfileWrapper = styled.div<ProfileWrapperProps>`
  border-radius: 70%;
  overflow: hidden;
  inline-size: ${(props) => props.$inlineSize}px;
  block-size: ${(props) => props.$blockSize}px;
`;

interface ProfileImageProps {
  blockSize?: number;
  inlineSize?: number;
  src?: string;
}

const StyledProfileImg = styled.img.attrs((props) => ({
  src: props.src,
}))`
  block-size: 100%;
  inline-size: 100%;
  object-fit: cover;
`;

const ProfileImage = ({
  blockSize = 40,
  inlineSize = 40,
  src = '/images/starDog.svg',
}: ProfileImageProps) => {
  return (
    <StyledProfileWrapper $blockSize={blockSize} $inlineSize={inlineSize}>
      <StyledProfileImg src={src} alt="프로필" />
    </StyledProfileWrapper>
  );
};

export default ProfileImage;
