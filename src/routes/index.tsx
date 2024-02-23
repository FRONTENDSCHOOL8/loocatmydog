import { createBrowserRouter } from 'react-router-dom';
import { navigationItems } from './navigation';
import Rootlayout from '@/components/layouts/Rootlayout';

// const options = {
//   basename: import.meta,
// };

const routes = [
  {
    path: '/',
    element: <Rootlayout />,
    children: navigationItems,
  },
];

export let router = createBrowserRouter(routes);
