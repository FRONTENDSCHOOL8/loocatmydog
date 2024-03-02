import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoInline from '@/components/atoms/Logo/LogoInline';
import HeartButton from '@/components/atoms/HeartButton/HeartButton';
import Calendar from '@/components/atoms/Calendar/Calendar';
import React from 'react';
import SearchInput from '../SearchInput/SearchInput';

// type = 'step' | 'main' | 'logo'  | 'place' | 'popup' | 'back'
interface HeaderProps {
  type: 'step' | 'main' | 'logo' | 'place' | 'popup' | 'back';
  title?: string;
  setDateRange?: (date: (Date | null)[]) => void;
  dateRange?: (Date | null)[];
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
    ${(props) => props.theme.fontStyles.textSemiboldMd}
    color: ${(props) => props.theme.colors.textBlack};
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
  }
`;

function Header({
  type = 'logo',
  title = '',
  dateRange,
  setDateRange,
}: HeaderProps) {
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
        aria-label="사이드 메뉴"
      ></button>
    );
  else
    leftSideContents = (
      <Link to={'/'} className="left-side" aria-label={ariaLabel}></Link>
    );

  const headerContentsObj = {
    step: {
      center: null,
      right: <span className="text-step">1/3</span>,
    },
    main: {
      center: dateRange && setDateRange && (
        <Calendar
          dateRange={dateRange}
          minMaxDateRange={[null, null]}
          setDateRange={setDateRange}
          customInput={<SearchInput address="마포구" />}
          isModal
        />
      ),
      right: (
        <h1>
          <LogoInline inlineSize={67} />
        </h1>
      ),
    },
    logo: {
      center: (
        <h1>
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
