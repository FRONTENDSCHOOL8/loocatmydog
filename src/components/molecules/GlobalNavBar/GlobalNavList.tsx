import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface GlobalNavListProps {
  path: string;
}

const StyledGlobalNavLink = styled(Link)`
  color: black;
`;

const GlobalNavList = ({ path = '/' }: GlobalNavListProps) => {
  return (
    <li>
      <StyledGlobalNavLink to={path}></StyledGlobalNavLink>
    </li>
  );
};

export default GlobalNavList;
