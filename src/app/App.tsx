import './App.css';
import { useState } from 'react';
import { router } from '@/routes';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Splash from '@/components/organisms/Splash/Splash';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      suspense: true,
    } as any,
  },
});

function App() {
  const TIME_OUT = 1300;
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);
  if (isFirstLoading) {
    setTimeout(() => {
      setIsFirstLoading(false);
    }, TIME_OUT);
    return <Splash />;
  }
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
