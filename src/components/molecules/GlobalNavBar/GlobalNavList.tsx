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
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 4px;

  text-decoration: none;
  ${(props) => props.theme.fontStyles.textMediumBase}

  color: ${(props) => props.theme.colors.textGray};

  &:active,
  &:visited {
    color: ${(props) => props.theme.colors.textGray};
  }

  .icon {
    content: ${(props) => {
      const dataName = props.$name;

      const imageUrl = `/images/navigation/${dataName}-inactive.svg`;

      return css`
        url(${imageUrl})
      `;
    }};
  }

  &:hover {
    color: #3b6b77;

    .icon {
      content: ${(props) => {
        const dataName = props.$name;

        const imageUrl = `/images/navigation/${dataName}-active.svg`;

        return css`
            url(${imageUrl})
          `;
      }};
    }
  }

  .active {
    content: ${(props) => {
      const dataName = props.$name;

      const imageUrl = `/images/navigation/${dataName}-active.svg`;

      return css`
            url(${imageUrl})
          `;
    }};
  }
`;

const GlobalNavList = ({ path = '/', text, dataName }: GlobalNavListProps) => {
  const location = useLocation();
  const className = location.pathname === path ? 'active' : 'icon';

  return (
    <StyledGlobalNavLink to={path} data-name={dataName} $name={dataName}>
      <img className={className} aria-labelledby={dataName} />
      <span id={dataName}>{text}</span>
    </StyledGlobalNavLink>
  );
};

export default GlobalNavList;
