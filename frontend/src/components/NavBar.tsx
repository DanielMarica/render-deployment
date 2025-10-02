import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
        Home
      </NavLink>
      <NavLink to="/list" className={({ isActive }) => isActive ? 'active' : ''}>
        List
      </NavLink>
      <NavLink to="/add" className={({ isActive }) => isActive ? 'active' : ''}>
        Add
      </NavLink>
    </nav>
  );
}
