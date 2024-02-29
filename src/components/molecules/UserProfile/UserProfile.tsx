import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledUserProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  inline-size: 100%;
  block-size: 43px;
  padding: 10px 20px;
`;

const StyledUserProfileSpanBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  & .userName {
    color: ${(props) => props.theme.colors.textBlack};
    ${(props) => props.theme.fontStyles.headingMd};
  }
  & .welcome {
    color: ${(props) => props.theme.colors.textDarkGray};
    ${(props) => props.theme.fontStyles.textRegularSm}
  }
`;

const UserProfile = ({
  name,
  src,
}: {
  name: string | ReactNode;
  src: string;
}) => {
  return (
    <StyledUserProfileBox>
      <StyledUserProfileSpanBox>
        <span className="userName">{name} 님</span>
        <span className="welcome">환영합니다!</span>
      </StyledUserProfileSpanBox>
      <ProfileImage blockSize={43} inlineSize={43} src={src} />
    </StyledUserProfileBox>
  );
};

export default UserProfile;
