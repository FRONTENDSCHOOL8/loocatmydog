import './App.css';
import { Suspense } from 'react';
import { router } from '@/routes';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  QueryClientProvider,
  QueryClient,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

function App() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <>
      <HelmetProvider>
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              <span>에러 발생! : {error.message}</span>
              <button type="button" onClick={() => resetErrorBoundary()}>
                재시도
              </button>
            </div>
          )}
        >
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<div>loading...</div>}>
              <RouterProvider router={router} />
              <ReactQueryDevtools buttonPosition="bottom-right" />
            </Suspense>
          </QueryClientProvider>
        </ErrorBoundary>
      </HelmetProvider>
    </>
  );
}

export default App;
