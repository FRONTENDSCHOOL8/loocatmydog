import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledUserProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  inline-size: 100%;
  block-size: 63px;
  padding: 10px 20px;
  position: relative;
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

const EditBtnLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 60px;
  display: flex;
  flex-flow: row;
  padding-inline-start: 15px;
  color: ${(props) => props.theme.colors.textBlack};
  ${(props) => props.theme.fontStyles.textRegularMd}
`;

const UserProfile = ({
  name,
  src = '/images/profileNone.svg',
  ...restProps
}: {
  name: string | ReactNode;
  src?: string;
  [key: string]: any;
}) => {
  return (
    <StyledUserProfileBox>
      <StyledUserProfileSpanBox>
        <div>
          <span className="userName">{name} 님</span>
          <EditBtnLink to="/edit_my_profile">
            수정
            <img src="/images/editPen.svg" alt="볼펜모양" />
          </EditBtnLink>
        </div>
        <span className="welcome">환영합니다!</span>
      </StyledUserProfileSpanBox>
      <ProfileImage blockSize={43} inlineSize={43} src={src} {...restProps} />
    </StyledUserProfileBox>
  );
};

export default UserProfile;
