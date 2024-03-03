import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { navigationItems } from './navigation';
import RootLayout from '@/components/layouts/RootLayout';

// const options = {
//   basename: import.meta,
// };

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: navigationItems,
  },
];

export let router = createBrowserRouter(routes);
