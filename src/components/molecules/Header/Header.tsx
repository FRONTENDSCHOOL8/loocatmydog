import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoInline from '@/components/atoms/Logo/LogoInline';
import HeartButton from '@/components/atoms/HeartButton/HeartButton';
import Calendar from '@/components/atoms/Calendar/Calendar';
import React from 'react';
import SearchInput from '../SearchInput/SearchInput';
import useModalControlStore from '@/store/useModalControl';
import { useAuthStore } from '@/store/useAuthStore';

// type = 'step' | 'main' | 'logo'  | 'place' | 'popup' | 'back'
export interface HeaderProps {
  type: 'step' | 'main' | 'logo' | 'place' | 'popup' | 'back';
  title?: string | null;
  phase?: string;
}
interface StyledHeaderProps {
  $type: 'step' | 'main' | 'logo' | 'place' | 'popup' | 'back';
}

const StyledHeader = styled.header<StyledHeaderProps>`
  position: relative;
  inline-size: 100%;
  block-size: 50px;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
  background: linear-gradient(to bottom, #ffe587 70%, #fff0b8);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  & > .left-side {
    inline-size: 23px;
    block-size: 20px;
    ${(props) =>
      props.$type === 'popup'
        ? `
            background: url('/images/cross.svg') no-repeat center;
          `
        : props.$type === 'main'
          ? `background: url('/images/hamburger.svg') no-repeat center`
          : `background: url('/images/direction_left.svg') no-repeat center`};
  }

  & .text-title {
    ${(props) => props.theme.fontStyles.headingMd}
    color: ${(props) => props.theme.colors.textBlack};
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
  }
  & .text-step {
    ${(props) => props.theme.fontStyles.textSemiboldSm}
    color: ${(props) => props.theme.colors.textGray};
  }

  & > .center {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    inline-size: 100%;
    block-size: 100%;
  }
`;

function Header({ type = 'logo', title = '', phase = '1/1' }: HeaderProps) {
  const { user } = useAuthStore();
  const shortAddress = user && user.address.split(' ')[1];
  const { setModal } = useModalControlStore();
  const navigate = useNavigate();
  const handleClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (type === 'popup') return;
    e.preventDefault();
    navigate(-1);
  };
  const ariaLabel =
    type === 'step' || type === 'logo' || type === 'place' || type === 'back'
      ? '뒤로가기'
      : '닫기';

  let leftSideContents;
  if (type === 'main')
    leftSideContents = (
      <button
        type="button"
        className="left-side"
        aria-label="사이드메뉴 열기"
        onClick={() => setModal('sideMenu', true)}
      ></button>
    );
  else
    leftSideContents = (
      <Link
        to={'/main'}
        onClick={handleClickLink}
        className="left-side"
        aria-label={ariaLabel}
      ></Link>
    );

  const headerContentsObj = {
    step: {
      center: null,
      right: <span className="text-step">{phase}</span>,
    },
    main: {
      center: (
        <Calendar
          customInput={<SearchInput address={shortAddress} />}
          isModal
        />
      ),
      right: (
        <h1>
          <Link to={'/main'} title="메인으로 이동">
            <LogoInline inlineSize={67} />
          </Link>
        </h1>
      ),
    },
    logo: {
      center: (
        <h1 className="text-title">
          <Link to={'/main'} title="메인으로 이동">
            <LogoInline inlineSize={67} />
          </Link>
        </h1>
      ),
      right: null,
    },
    place: {
      center: <h1 className="text-title">플레이스</h1>,
      right: '',
    },
    popup: {
      center: <h1 className="text-title">{title}</h1>,
      right: null,
    },
    back: {
      center: <h1 className="text-title">{title}</h1>,
      right: null,
    },
  };
  return (
    <StyledHeader $type={type}>
      {leftSideContents}
      <div className="center">{headerContentsObj[type].center}</div>
      <div className="right-side">{headerContentsObj[type].right}</div>
    </StyledHeader>
  );
}

export default Header;
