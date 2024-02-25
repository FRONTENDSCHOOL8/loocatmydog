import styled from 'styled-components';

const StyledHeader = styled.header`
  inline-size: 100%;
  block-size: 60px;
  background-color: orange;
`;

function Header() {
  return <StyledHeader>헤더</StyledHeader>;
}

export default Header;
