import { createBrowserRouter } from 'react-router-dom';
import { navigationItems } from './navigation';
import RootLayout from '@/components/layouts/Rootlayout';

// const options = {
//   basename: import.meta,
// };

const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: navigationItems,
  },
];

export let router = createBrowserRouter(routes);
