import React, { Suspense, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from '../molecules/LoadingSpinner/LoadingSpinner';

const StyledOutletLayout = styled.main`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
  overflow-x: hidden;
`;

function OutletLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  // 스크롤 초기화
  useLayoutEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <StyledOutletLayout ref={mainRef}>{children}</StyledOutletLayout>
    </Suspense>
  );
}

export default OutletLayout;
