import styled from 'styled-components';

const StyledButtonPlus = styled.button`
  background: url('/images/buttonPlus.svg') no-repeat 0 0 / contain;
  width: 45px;
  height: 45px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const ButtonPlus = () => {
  return <StyledButtonPlus></StyledButtonPlus>;
};

export default ButtonPlus;
