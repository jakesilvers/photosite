import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <span style={styles.logo}>📸 PhotoSite</span>
        <div style={styles.links}>
          {isLoggedIn && (
            <>
              <Link to="/gallery" style={styles.link}>Gallery</Link>
              {role === 'master' && <Link to="/upload" style={styles.link}>Upload</Link>}
              <button onClick={handleLogout} style={styles.button}>Logout</button>
            </>
          )}
          {!isLoggedIn && (
            <Link to="/login" style={styles.link}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    padding: '0.75rem 0',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    color: '#1976d2',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
    fontSize: '1rem',
  },
  button: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#d32f2f',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
  }
};

export default Navbar;
