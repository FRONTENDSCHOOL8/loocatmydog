import './App.css';
import { Suspense } from 'react';
import { router } from '@/routes';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import LoadingSpinner from '@/components/molecules/LoadingSpinner/LoadingSpinner';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      suspense: true,
    } as any,
  },
});

function App() {
  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools buttonPosition="bottom-right" />
        </QueryClientProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
