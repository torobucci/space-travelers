import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';

function LayOut() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
export default LayOut;
