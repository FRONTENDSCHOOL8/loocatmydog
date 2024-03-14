import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const StyledErrorBoundaryContainer = styled.div`
  min-inline-size: 280px;
  max-inline-size: 420px;
  block-size: 100dvh;
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  row-gap: 30px;

  & > .error-title {
    ${(props) => props.theme.fontStyles.headingMd};
  }

  & > .error-description {
    ${(props) => props.theme.fontStyles.textSemiboldBase};
  }
`;

const ErrorBoundary = () => {
  const error = useRouteError();
  const timeoutSeconds = 5;
  const navigate = useNavigate();
  console.error(error);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, timeoutSeconds * 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <StyledErrorBoundaryContainer>
      <h1 className="error-title">처리 중 알 수 없는 오류가 발생했습니다.</h1>
      <p className="error-description">
        {timeoutSeconds}초 후 메인페이지로 이동합니다.
      </p>
    </StyledErrorBoundaryContainer>
  );
};

export default ErrorBoundary;
