import { MouseEvent, MouseEventHandler, useState } from 'react';
import styled from 'styled-components';

interface GlobalNavBarProps {
  onClick: MouseEventHandler<HTMLLIElement>;
}

const StyledGlobalNavBar = styled.nav`
  inline-size: 100%;
  block-size: 70px;

  // 임시
  border: 1px solid black;
  font-size: 10px;
  font-weight: 600;
  //

  /* font-size: ${(props) => props.theme.textRegularSm}; */

  & ul {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    padding: 12px;
  }
`;

const StyledNavList = styled.li`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  cursor: pointer;

  &:hover {
    background-color: #b1b1b1;
  }

  & img {
    inline-size: 25px;
    block-size: 25px;
  }
`;

const GlobalNavBar = () => {
  return (
    <StyledGlobalNavBar>
      <ul></ul>
    </StyledGlobalNavBar>
  );
};

export default GlobalNavBar;
