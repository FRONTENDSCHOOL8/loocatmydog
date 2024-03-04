import React from 'react';
import styled from 'styled-components';

const StyledOutletLayout = styled.main`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
`;

function OutletLayout({ children }: { children: React.ReactNode }) {
  return <StyledOutletLayout>{children}</StyledOutletLayout>;
}

export default OutletLayout;
