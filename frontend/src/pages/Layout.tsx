import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar.tsx';

export default function Layout() {
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
        <Outlet />
      </div>
    </div>
  );
}
