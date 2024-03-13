import styled, { css } from 'styled-components';
import { MouseEvent, useState, KeyboardEvent } from 'react';

interface MenuItem {
  id: string;
  label: string;
}

interface DropDownProps {
  setCurrent: ({ id, label }: MenuItem) => void;
  items?: MenuItem[];
}

interface StyledDropDownTestProps {
  $current: string;
  $isOpen: boolean;
}

const defaultMenuList: MenuItem[] = [
  {
    id: 'popular',
    label: '인기순',
  },
  {
    id: 'distance',
    label: '거리순',
  },
  {
    id: 'price',
    label: '가격순',
  },
];

const StyledDropDownTest = styled.div<StyledDropDownTestProps>`
  position: relative;
  display: inline-flex;
  flex-flow: column nowrap;
  ${(props) => props.theme.fontStyles.textRegularSm}

  & button {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    background-color: ${(props) => props.theme.colors.gray100};
    border: 1px solid ${(props) => props.theme.colors.gray300};
    transition: background-color 0.2s;
    &:hover {
      background-color: ${(props) => props.theme.colors.gray300};
    }

    ${(props) => {
      if (props.$isOpen) {
        return css`
          border-radius: 5px 5px 0 0;
        `;
      } else if (!props.$isOpen) {
        return css`
          border-radius: 10px;
        `;
      }
    }}
  }

  & input {
    margin: 0px;
    padding: 0px;
    border: 0px;
    background-color: transparent;
    pointer-events: none;
    ${(props) => {
      const size = Number(props.$current.length) * 10;

      return css`
        inline-size: ${size}px;
      `;
    }}
  }

  & ul {
    position: absolute;
    top: 100%;
    left: 0;
    inline-size: 100%;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 0 0 5px 5px;
    overflow: hidden;
    z-index: 20;

    & li {
      padding: 3px 10px 3px 10px;
      cursor: pointer;
      &:hover {
        background-color: ${(props) => props.theme.colors.gray100};
      }
    }
  }
`;

const DropDown = ({ items = defaultMenuList, setCurrent }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<MenuItem>(items[0]);
  const restMenuList = items.filter((item) => item.id !== value.id);

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLLIElement>) => {
    const { id, innerText: label } = e.currentTarget;
    if (e.key === 'Enter') {
      setValue({ id, label });
      setCurrent({ id, label });
      setIsOpen(!isOpen);
    }
  };

  const handleValue = (e: MouseEvent<HTMLLIElement>) => {
    const { id, innerText: label } = e.currentTarget;
    setValue({ id, label });
    setCurrent({ id, label });
    setIsOpen(!isOpen);
  };

  return (
    <StyledDropDownTest $current={value.label} $isOpen={isOpen}>
      <label htmlFor="menuValue"></label>
      <button type="button" onClick={handleDropDown}>
        <input
          type="text"
          id="menuValue"
          readOnly
          value={value.label}
          tabIndex={-1}
        />
        {isOpen ? (
          <img src="/images/arrow/arrowUp.svg" alt="닫기" />
        ) : (
          <img src="/images/arrow/arrowDown.svg" alt="열기" />
        )}
      </button>
      {isOpen && (
        <ul>
          {restMenuList.map((menu) => (
            <li
              key={menu.id}
              id={menu.id}
              onClick={handleValue}
              onKeyDown={handleKeyPress}
              tabIndex={0}
            >
              {menu.label}
            </li>
          ))}
        </ul>
      )}
    </StyledDropDownTest>
  );
};

export default DropDown;
