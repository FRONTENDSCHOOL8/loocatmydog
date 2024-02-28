import styled, { css } from 'styled-components';
import GlobalNavList from './GlobalNavList';

interface GlobalNavBarProps {
  isShown?: boolean;
}

interface StyledGlobalNavBarProps {
  $isShown: boolean;
}

const StyledGlobalNavBar = styled.nav<StyledGlobalNavBarProps>`
  inline-size: 100%;
  block-size: 70px;

  & ul {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    padding: 12px;
  }

  ${(props) => {
    if (props.$isShown) {
      return null;
    } else if (!props.$isShown) {
      return css`
        display: none;
      `;
    }
  }}
`;

const NAVIGATION_LIST = [
  {
    path: '/main',
    text: '홈',
    dataName: 'home',
  },
  {
    path: '/reservation_list',
    text: '예약 내역',
    dataName: 'reservationList',
  },
  {
    path: '/stories',
    text: '스토리',
    dataName: 'stories',
  },
  {
    path: '/chat_list',
    text: '채팅 목록',
    dataName: 'chatList',
  },
  {
    path: '/mypage',
    text: '내 프로필',
    dataName: 'profile',
  },
];

const GlobalNavBar = ({ isShown = true }: GlobalNavBarProps) => {
  return (
    <StyledGlobalNavBar $isShown={isShown}>
      <ul>
        {NAVIGATION_LIST.map((item) => (
          <li key={item.dataName}>
            <GlobalNavList
              path={item.path}
              text={item.text}
              dataName={item.dataName}
            />
          </li>
        ))}
      </ul>
    </StyledGlobalNavBar>
  );
};

export default GlobalNavBar;
