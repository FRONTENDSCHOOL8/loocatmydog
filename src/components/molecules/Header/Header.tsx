import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';
import LogoInline from '@/components/atoms/Logo/LogoInline';
import HeartButton from '@/components/atoms/HeartButton/HeartButton';
import SearchInput from '../SearchInput/SearchInput';

// type = 'step' | 'main' | 'logo' | 'post' | 'place' | 'popup' | 'back'
interface HeaderProps {
  type: 'step' | 'main' | 'logo' | 'post' | 'place' | 'popup' | 'back';
  title?: string;
}
interface StyledHeaderProps {
  $type: 'step' | 'main' | 'logo' | 'post' | 'place' | 'popup' | 'back';
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
      props.$type === 'popup' || props.$type === 'post'
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

const StyledPostButton = styled.button.attrs({ type: 'submit' })`
  color: ${(props) => props.theme.colors.textBlack};
  ${(props) => props.theme.fontStyles.textSemiboldBase}
  padding: 4px 6px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 60px;
`;

function Header({ type = 'logo', title = '' }: HeaderProps) {
  let ComponentName:
    | ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>
    | string = Link;
  if (type === 'main') ComponentName = 'button';
  const headerContentsObj = {
    step: {
      center: null,
      right: <span className="text-step">1/3</span>,
    },
    main: {
      center: <SearchInput />,
      right: (
        <h1>
          <LogoInline widthHeight={{ inlineSize: 67, blockSize: 23 }} />
        </h1>
      ),
    },
    logo: {
      center: (
        <h1>
          <LogoInline widthHeight={{ inlineSize: 67, blockSize: 23 }} />
        </h1>
      ),
      right: null,
    },
    post: {
      center: null,
      right: <StyledPostButton form="form">게시하기</StyledPostButton>,
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
      <ComponentName className="left-side" to={'/'}></ComponentName>
      <div className="center">{headerContentsObj[type].center}</div>
      <div className="right-side">{headerContentsObj[type].right}</div>
    </StyledHeader>
  );
}

export default Header;
