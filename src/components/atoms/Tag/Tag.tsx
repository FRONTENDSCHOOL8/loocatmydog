import React from 'react';
import styled from 'styled-components';

const StyledTagWrapper = styled.span`
  display: inline-block;
  padding-inline: 12px;
  padding-block: 2px;
  border: solid 1px #f1f1f1;
  border-radius: 50px;
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.1);
  font-size: 10px;
  font-weight: 400;
  color: #868686;
  text-align: center;
`;

const Tag = ({ children }: { children: React.ReactNode }) => {
  return <StyledTagWrapper>#{children}</StyledTagWrapper>;
};

export default Tag;
