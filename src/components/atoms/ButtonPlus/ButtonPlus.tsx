import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ButtonPlusProps {
  path?: string;
}

const StyledButtonPlus = styled(Link).attrs({
  'aria-label': '글작성 페이지 이동',
})`
  display: block;
  background: url('/images/buttonPlus.svg') no-repeat 0 0 / contain;
  width: 45px;
  height: 45px;
  border: none;
  position: sticky;
  left: 80%;
  bottom: 10%;
`;

const ButtonPlus = ({ path = '/' }: ButtonPlusProps) => {
  return <StyledButtonPlus to={path} />;
};

export default ButtonPlus;
