import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoInline from '@/components/atoms/Logo/LogoInline';
import HeartButton from '@/components/atoms/HeartButton/HeartButton';
import Calendar from '@/components/atoms/Calendar/Calendar';
import React from 'react';
import SearchInput from '../SearchInput/SearchInput';
import useModalControlStore from '@/store/useModalControl';

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
        onClick={() => setModal(true)}
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
        <Calendar customInput={<SearchInput address="마포구" />} isModal />
      ),
      right: (
        <h1>
          <LogoInline inlineSize={67} />
        </h1>
      ),
    },
    logo: {
      center: (
        <h1 className="text-title">
          <LogoInline inlineSize={67} />
        </h1>
      ),
      right: null,
    },
    place: {
      center: <h1 className="text-title">플레이스</h1>,
      right: <HeartButton fill={false} />,
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
