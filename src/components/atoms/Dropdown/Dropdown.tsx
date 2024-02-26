import { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

export interface DropdownProps {
  current?: '거리순' | '가격순' | '인기순';
  type: 'inactive' | 'active' | 'more';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface StyledDropdownProps {
  $type: 'inactive' | 'active' | 'more';
}

const StyledDropdown = styled.div<StyledDropdownProps>`
  display: inline-flex;
  flex-flow: column nowrap;

  & button {
    border: 0px;
    font-size: 10px;
    padding-block: 3px;
    padding-inline: 10px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
  }

  ${(props) => {
    if (props.$type === 'inactive' || props.$type === 'more') {
      return css`
        & button {
          border-radius: 10px;
        }
      `;
    } else if (props.$type === 'active') {
      return css`
        :first-child {
          border-radius: 5px 5px 0 0;
        }
        :last-child {
          border-radius: 0 0 5px 5px;
        }
      `;
    }
  }}
`;

const ArrowDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="5"
    viewBox="0 0 8 5"
    fill="none"
  >
    <path
      d="M1 1L4 4L7 1"
      stroke="#868686"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="5"
    viewBox="0 0 8 5"
    fill="none"
  >
    <path
      d="M1 4L4 1L7 4"
      stroke="#868686"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="5"
    height="7"
    viewBox="0 0 5 7"
    fill="none"
  >
    <path
      d="M1 6.5L4 3.5L1 0.5"
      stroke="#868686"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DropDownMenuList = ['거리순', '가격순', '인기순'];

const Dropdown = ({ type, current = '거리순', onClick }: DropdownProps) => {
  let DropDownMenu;
  const changedMenuList = DropDownMenuList.filter((Menu) => Menu !== current);

  switch (type) {
    case 'inactive':
      DropDownMenu = (
        <button onClick={onClick}>
          {current} {ArrowDown}
        </button>
      );
      break;
    case 'active':
      DropDownMenu = (
        <>
          <button onClick={onClick}>
            {current} {ArrowUp}
          </button>
          <button onClick={onClick}>{changedMenuList[0]}</button>
          <button onClick={onClick}>{changedMenuList[1]}</button>
        </>
      );
      break;
    case 'more':
      DropDownMenu = <button onClick={onClick}>더보기 {ArrowRight}</button>;
      break;
  }

  return <StyledDropdown $type={type}>{DropDownMenu}</StyledDropdown>;
};

export default Dropdown;
