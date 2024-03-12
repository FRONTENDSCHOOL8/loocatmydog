import pb from '@/api/pocketbase';
import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import { useAuthStore } from '@/store/useAuthStore';
import useModalControlStore from '@/store/useModalControl';
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDimmed = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 50%;
  translate: -50% 0%;
  inline-size: 100%;
  min-inline-size: 280px;
  max-inline-size: 420px;
  block-size: 100dvh;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 9999;
`;

const StyledSideMenuContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  inline-size: 72.5%;
  block-size: 100dvh;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 9999;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    translate: 0 50%;
    inline-size: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: #fffcf0;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    inline-size: 100%;
    aspect-ratio: 1/0.7;
    background: url('/images/sidemenu/sidebar_dog.png') no-repeat 80% 98%/ 53.4%;
  }
  & .header {
    padding: 12px 18px;
    & .close-button {
      inline-size: 20px;
      aspect-ratio: 1/1;
      background: url('/images/cross.svg') no-repeat center;
    }
  }
`;

interface StyledSideMenuInnerContainerProps {
  $gap?: number;
}
const StyledSideMenuInnerContainer = styled.div<StyledSideMenuInnerContainerProps>`
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;
  /* align-items: flex-start; */
  row-gap: ${(props) => (props.$gap ? `${props.$gap}px` : null)};
`;

const StyledLinkButton = styled(Link)`
  align-self: flex-start;
  ${(props) => props.theme.fontStyles.textSemiboldSm};
  color: ${(props) => props.theme.colors.white};
  margin-inline-start: 10px;
  padding: 4px 8px;
  background-color: ${(props) => props.theme.colors.orange};
  border-radius: 2px;
`;

const StyledSideMenuNavigation = styled.nav`
  ${(props) => props.theme.fontStyles.textSemiboldMd};
  color: ${(props) => props.theme.colors.textBlack};
  & .navigation-list {
    display: flex;
    flex-flow: column nowrap;
    row-gap: 20px;
  }
`;
interface StyledSideMenuNavigationItemProps {
  $icon?: string;
}
const StyledSideMenuNavigationItem = styled.li<StyledSideMenuNavigationItemProps>`
  display: inline-block;
  & > a {
    position: relative;
    display: block;
    block-size: 25px;
    line-height: 25px;
    padding-inline-start: 20px;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      translate: 0 -50%;
      inline-size: 15px;
      aspect-ratio: 1/1;
      background: ${(props) => `url(${props.$icon}) no-repeat`};
    }
  }
`;

const sideMenuObject = [
  {
    path: '/myplace_list',
    icon: '/images/sidemenu/myplace.svg',
    label: '나의 플레이스 목록',
  },
  {
    path: '/stories',
    icon: '/images/sidemenu/story.svg',
    label: '봐주개냥 스토리',
  },
  {
    path: '/bookmark',
    icon: '/images/sidemenu/heart.svg',
    label: '내가 찜한 플레이스',
  },
  {
    path: '/events',
    icon: '/images/sidemenu/events.svg',
    label: '이벤트',
  },
];

const SideMenu = () => {
  const { setModal } = useModalControlStore();
  const { user } = useAuthStore();
  const myAvatarUrl = user && pb.files.getUrl(user, user.avatar);
  console.log(myAvatarUrl);
  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (e.target === e.currentTarget) setModal(false);
  };
  return (
    <StyledDimmed
      initial="hidden"
      animate="visible"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      onClick={handleCloseModal}
    >
      <StyledSideMenuContainer
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ ease: 'easeOut' }}
      >
        <div className="header">
          <button
            type="button"
            className="close-button"
            aria-label="사이드메뉴 닫기"
            onClick={handleCloseModal}
          ></button>
        </div>
        <StyledSideMenuInnerContainer $gap={5}>
          <UserProfile
            style={{ padding: 0 }}
            name={user?.name}
            src={myAvatarUrl as string}
          />
          <StyledLinkButton to={'/add_place'}>플레이스 등록</StyledLinkButton>
        </StyledSideMenuInnerContainer>

        <StyledSideMenuInnerContainer>
          <StyledSideMenuNavigation>
            <ul className="navigation-list">
              {sideMenuObject?.map((item) => (
                <StyledSideMenuNavigationItem key={item.path} $icon={item.icon}>
                  <Link to={item.path}>{item.label}</Link>
                </StyledSideMenuNavigationItem>
              ))}
            </ul>
          </StyledSideMenuNavigation>
        </StyledSideMenuInnerContainer>
      </StyledSideMenuContainer>
    </StyledDimmed>
  );
};

export default SideMenu;
