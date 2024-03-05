import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export interface HeaderProps {
  type: 'step' | 'popup';
  title?: string | null;
  phase?: string;
  back(): void;
}
interface StyledHeaderProps {
  $type: 'step' | 'popup';
}

const StyledHeader = styled.header<StyledHeaderProps>`
  position: relative;
  inline-size: 100%;
  block-size: 50px;
  padding-block: 0.75rem;
  padding-inline: 2rem;
  padding: 0.75rem 2rem 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;

  & > .left-side {
    inline-size: 23px;
    block-size: 20px;
    ${(props) =>
      props.$type === 'popup'
        ? `
            background: url('/images/cross.svg') no-repeat center;
          `
        : `background: url('/images/direction_left.svg') no-repeat center`};
  }

  & .text-title {
    ${(props) => props.theme.fontStyles.headingMd}
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

function SignUpHeader({
  type = 'popup',
  title = '',
  phase = '1/1',
  back,
}: HeaderProps) {
  const navigate = useNavigate();
  const handleClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (type === 'popup') return;
    e.preventDefault();
    navigate(-1);
  };
  const ariaLabel = type === 'popup' ? '닫기' : '뒤로가기';

  let leftSideContents;
  if (type === 'step')
    leftSideContents = (
      <button
        onClick={back}
        className="left-side"
        aria-label={ariaLabel}
      ></button>
    );
  else
    leftSideContents = (
      <Link
        to={'/'}
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

    popup: {
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

export default SignUpHeader;
