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
  widthHeight: { blockSize: number; inlineSize: number };
}

const StyledProfileImg = styled.img.attrs((props) => ({
  src: props.src,
}))`
  block-size: 100%;
  inline-size: 100%;
  object-fit: cover;
`;

const ProfileImage = ({ widthHeight }: ProfileImageProps) => {
  const { blockSize = 40, inlineSize = 40 } = widthHeight;
  return (
    <StyledProfileWrapper $blockSize={blockSize} $inlineSize={inlineSize}>
      <StyledProfileImg src={'/images/starDog.svg'} alt="프로필" />
    </StyledProfileWrapper>
  );
};

export default ProfileImage;
