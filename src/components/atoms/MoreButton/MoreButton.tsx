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

  background-color: ${(props) => props.theme.colors.lineColorGray};
  block-size: 21px;
  ${(props) => props.theme.fontStyles.textRegularSm}
  border: 0px;
  border-radius: 10px;

  &:active,
  &:visited {
    color: ${(props) => props.theme.colors.textBlack};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.gray300};
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
