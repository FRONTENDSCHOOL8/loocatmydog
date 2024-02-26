import styled from 'styled-components';

const StyledButtonPlus = styled.button`
  background: url('/images/buttonPlus.svg') no-repeat 0 0 / contain;
  width: 45px;
  height: 45px;
  border: none;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
  }
`;

const ButtonPlus = () => {
  return <StyledButtonPlus></StyledButtonPlus>;
};

export default ButtonPlus;
