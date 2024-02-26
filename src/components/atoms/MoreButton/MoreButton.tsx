import { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

interface MoreButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
}

interface StyledMoreButtonProps {
  $text: string;
}

const StyledMoreButton = styled.button<StyledMoreButtonProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 10px;

  background-color: #f1f1f1;
  block-size: 21px;
  font-size: 10px;
  border: 0px;
  border-radius: 10px;

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

const MoreButton = ({ onClick, text = '더보기' }: MoreButtonProps) => {
  return (
    <StyledMoreButton $text={text} onClick={onClick}>
      {text}
      <img src="/images/arrow/arrowRight.svg" alt="" />
    </StyledMoreButton>
  );
};

export default MoreButton;
