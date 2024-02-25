import styled from 'styled-components';

const StyledGlobalNavBar = styled.nav`
  inline-size: 100%;
  block-size: 60px;
  background-color: brown;

  & ul {
    block-size: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & li {
      background-color: red;
    }
  }
`;

function GlobalNavBar() {
  return (
    <StyledGlobalNavBar>
      <ul>
        <li>메뉴1</li>
        <li>메뉴2</li>
        <li>메뉴3</li>
        <li>메뉴4</li>
        <li>메뉴5</li>
      </ul>
    </StyledGlobalNavBar>
  );
}

export default GlobalNavBar;
