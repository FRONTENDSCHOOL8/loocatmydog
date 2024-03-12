import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  console.log(error);
  return <div>오류가 발생했습니다.</div>;
};

export default ErrorBoundary;
