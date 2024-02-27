import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface MoreButtonProps {
  path: string;
  text: string;
}

interface StyledMoreButtonProps {
  $text: string;
}

const StyledMoreButton = styled(Link)<StyledMoreButtonProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 10px;
  text-decoration: none;

  background-color: #f1f1f1;
  block-size: 21px;
  ${(props) => props.theme.fontStyles.textRegularSm}
  border: 0px;
  border-radius: 10px;

  &:active,
  &:visited {
    color: black;
  }

  &:hover {
    background-color: #d1d1d1;
  }
  ${(props) => {
    const size = Number(props.$text.length) * 10 + 32;

    return css`
      inline-size: ${size}px;
    `;
  }}
`;

const MoreButton = ({ path = '/', text = '더보기' }: MoreButtonProps) => {
  return (
    <StyledMoreButton $text={text} to={path}>
      {text}
      <img src="/images/arrow/arrowRight.svg" alt="" />
    </StyledMoreButton>
  );
};

export default MoreButton;
