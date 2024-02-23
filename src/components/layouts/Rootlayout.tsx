import { Outlet } from 'react-router-dom';
import GlobalNavBar from './GlobalNavBar';

function Rootlayout() {
  return (
    <div>
      <Outlet />
      <GlobalNavBar />
    </div>
  );
}

export default Rootlayout;
