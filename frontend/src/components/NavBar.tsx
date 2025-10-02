import { NavLink, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

  return (
    <nav 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: '#7c3aed',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '3rem', 
        padding: '1.5rem',
        maxWidth: '100%'
      }}>
        <NavLink 
          to="/" 
          style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontWeight: location.pathname === '/' ? 'bold' : 'normal',
            fontSize: '1.1rem',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Home
        </NavLink>
        <NavLink 
          to="/list" 
          style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontWeight: location.pathname === '/list' ? 'bold' : 'normal',
            fontSize: '1.1rem',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          List
        </NavLink>
        <NavLink 
          to="/add" 
          style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontWeight: location.pathname === '/add' ? 'bold' : 'normal',
            fontSize: '1.1rem',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Add
        </NavLink>
      </div>
    </nav>
  );
}
