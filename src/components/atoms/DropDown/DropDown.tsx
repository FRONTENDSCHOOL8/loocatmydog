import styled, { css } from 'styled-components';
import {
  MouseEvent,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
} from 'react';

interface DropDownTestProps {
  current: string;
  setCurrent: Dispatch<SetStateAction<string>>;
  items?: string[];
}

interface StyledDropDownTestProps {
  $current: string;
  $isOpen: boolean;
}

const MenuList = ['거리순', '가격순', '인기순'];

const StyledDropDownTest = styled.div<StyledDropDownTestProps>`
  display: inline-flex;
  flex-flow: column nowrap;

  & div {
    display: inline-flex;
    gap: 5px;
    padding: 3px 10px 3px 10px;
    background-color: #f1f1f1;
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
    font-size: 10px;
    border: 0px;
    background-color: transparent;
    ${(props) => {
      const size = Number(props.$current.length) * 10;

      return css`
        inline-size: ${size}px;
      `;
    }}
  }

  & button {
    background-color: transparent;
    padding: 0;
    border: 0px;
  }

  & ul {
    background-color: #f1f1f1;
    border-radius: 0 0 5px 5px;
  }

  & li {
    padding: 0 10px 3px 10px;
    font-size: 10px;
  }
`;

const DropDown = ({
  items = MenuList,
  current = '거리순',
  setCurrent,
}: DropDownTestProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(current);
  const newMenuList = useRef(items.filter((menu) => menu !== value));

  useEffect(() => {
    newMenuList.current = items.filter((menu) => menu !== value);
    setCurrent(value);
  }, [value, items]);

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter') {
      const item = e.currentTarget.innerText;
      setValue(item);
      setIsOpen(!isOpen);
    }
  };

  const handleValue = (e: MouseEvent<HTMLLIElement>) => {
    const item = e.currentTarget.innerText;
    setValue(item);
    setIsOpen(!isOpen);
  };

  return (
    <StyledDropDownTest $current={value} $isOpen={isOpen}>
      <label htmlFor="menuValue"></label>
      <div>
        <input type="text" id="menuValue" readOnly value={value} />
        <button type="button" onClick={handleDropDown}>
          {isOpen ? (
            <img src="/images/arrow/arrowUp.svg" alt="닫기" />
          ) : (
            <img src="/images/arrow/arrowDown.svg" alt="열기" />
          )}
        </button>
      </div>
      <ul>
        {isOpen &&
          newMenuList.current.map((menu) => (
            <li
              key={menu}
              onClick={handleValue}
              onKeyPress={handleKeyPress}
              tabIndex={0}
            >
              {menu}
            </li>
          ))}
      </ul>
    </StyledDropDownTest>
  );
};

export default DropDown;
