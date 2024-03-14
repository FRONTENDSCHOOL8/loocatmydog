import { useLayoutEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface GlobalNavListProps {
  path: string;
  text: string;
  dataName: string;
}

interface StyledGlobalNavListProps {
  $name: string;
}

const StyledGlobalNavLink = styled(NavLink)<StyledGlobalNavListProps>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-end;
  gap: 4px;
  text-decoration: none;
  min-inline-size: 52px;
  block-size: 100%;
  ${(props) => props.theme.fontStyles.textMediumBase}
  color: ${(props) => props.theme.colors.textGray};

  & > span {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
    text-align: center;
    padding-block-start: 30px;
    &::before {
      position: absolute;
      content: '';
      inline-size: 25px;
      aspect-ratio: 1/1;
      top: 0px;
      left: 50%;
      translate: -50% 0%;
    }
  }
  &.active > span {
    color: ${(props) => props.theme.colors.textEmphasis};
    &::before {
      background: ${(props) =>
        `url('/images/navigation/${props.$name}-active.svg')`};
    }
  }

  & > span::before,
  &.pending > span::before {
    background: ${(props) =>
      `url('/images/navigation/${props.$name}-inactive.svg')`};
  }

  &:hover {
    color: ${(props) => props.theme.colors.textEmphasis};
    & > span::before {
      background: ${(props) =>
        `url('/images/navigation/${props.$name}-active.svg')`};
    }
  }
`;

const GlobalNavList = ({ path = '/', text, dataName }: GlobalNavListProps) => {
  return (
    <StyledGlobalNavLink
      className={({ isActive, isPending }) =>
        isPending ? 'pending' : isActive ? 'active' : ''
      }
      to={path}
      data-name={dataName}
      $name={dataName}
    >
      <span>{text}</span>
    </StyledGlobalNavLink>
  );
};

export default GlobalNavList;
