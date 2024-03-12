import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { navigationItems } from './navigation';
import RootLayout from '@/components/layouts/RootLayout';
import ErrorBoundary from '@/pages/ErrorBoundary/ErrorBoundary';

// const options = {
//   basename: import.meta,
// };

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: navigationItems,
    // errorElement: <ErrorBoundary />,
  },
];

export let router = createBrowserRouter(routes);
