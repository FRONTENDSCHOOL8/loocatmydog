import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { hoverType } from './GlobalNavBar';

interface GlobalNavListProps {
  path: string;
  text: string;
  dataName: string;
  active: boolean;
  hover: hoverType;
  setHover: Dispatch<SetStateAction<hoverType>>;
}

const StyledGlobalNavLink = styled(Link)`
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

  &:hover {
    color: #3b6b77;
  }
`;

const GlobalNavList = ({
  path = '/',
  text,
  dataName,
  active = false,
  hover,
  setHover,
}: GlobalNavListProps) => {
  const handleMouseEnter = () => {
    setHover({
      ...hover,
      [dataName]: true,
    });
  };

  const handleMouseLeave = () => {
    setHover({
      ...hover,
      [dataName]: false,
    });
  };

  return (
    <StyledGlobalNavLink
      to={path}
      data-name={dataName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={`/images/navigation/${dataName}-${active ? 'active' : 'inactive'}.svg`}
        aria-labelledby={dataName}
      />
      <span id={dataName}>{text}</span>
    </StyledGlobalNavLink>
  );
};

export default GlobalNavList;
