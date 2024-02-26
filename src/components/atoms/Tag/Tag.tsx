import React from 'react';
import styled from 'styled-components';

interface ToggleWrapperProps {
  $inlineSize: number;
}

const StyledTagWrapper = styled.div<ToggleWrapperProps>`
  inline-size: ${(props) => props.$inlineSize}px;
  block-size: 15px;
  padding-inline: 12px;
  padding-block: 2px;
  border: solid 1px #f1f1f1;
  border-radius: 50px;
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.1);
  & span {
    display: block;
    padding-block-start: 2px;
    font-size: 10px;
    font-weight: 400;
    color: #868686;
    text-align: center;
  }
`;

const Tag = (
  { children }: { children: React.ReactNode },
  inlineSize: number
) => {
  return (
    <StyledTagWrapper $inlineSize={(inlineSize = 24)}>
      <span>#{(children = '태그')}</span>
    </StyledTagWrapper>
  );
};

export default Tag;
