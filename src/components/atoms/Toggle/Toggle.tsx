import { Dispatch, SetStateAction, useId } from 'react';
import styled from 'styled-components';

const StyledToggleLabel = styled.label`
  display: block;
  position: relative;
  inline-size: 100%;
  block-size: 17px;
  padding: 4px 5px;
  background-color: ${(props) => props.theme.colors.white};
  border: solid 1px ${(props) => props.theme.colors.lineColorGray};
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
    border: 1px solid ${(props) => props.theme.colors.orange};

    & span {
      background: ${(props) => props.theme.colors.orange};
      left: calc(50%);
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
        onClick={toggleIsActive}
      />
      <StyledToggleLabel htmlFor={toggleId}>
        <span></span>
      </StyledToggleLabel>
    </>
  );
};

export default Toggle;
