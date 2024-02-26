import { Dispatch, SetStateAction, useId } from 'react';
import styled from 'styled-components';

const StyledToggleLabel = styled.label`
  display: block;
  position: relative;
  inline-size: 28px;
  block-size: 12px;
  padding-inline: 5px;
  padding-block: 4px;
  background-color: #fff;
  border: solid 1px #f1f1f1;
  border-radius: 50px;
  cursor: pointer;

  & span {
    position: absolute;
    inline-size: 12px;
    block-size: 12px;
    top: 50%;
    left: 4px;
    transform: translateY(-50%);
    border-radius: 50%;
    background: #e3e3e3;
    transition: all 0.2s ease-in;
  }
`;

const StyledCheckBox = styled.input`
  display: none;

  &:checked + ${StyledToggleLabel} {
    border: 1px solid #ffb62b;

    & span {
      background: #ffb62b;
      left: calc(60%);
    }
  }
`;

interface ToggleProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const Toggle = ({ isActive, setIsActive }: ToggleProps) => {
  const toggleIsActive = () => setIsActive(!isActive);
  const toggleId = useId();
  return (
    <>
      <StyledCheckBox
        id={toggleId}
        type="checkbox"
        checked={isActive}
        onChange={toggleIsActive}
      />
      <StyledToggleLabel htmlFor={toggleId}>
        <span></span>
      </StyledToggleLabel>
    </>
  );
};

export default Toggle;
