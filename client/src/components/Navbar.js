// client/src/components/Navbar.js
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
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      {isLoggedIn && (
        <>
          <Link to="/gallery" style={{ marginRight: '1rem' }}>Gallery</Link>
          {role === 'master' && (
            <Link to="/upload" style={{ marginRight: '1rem' }}>Upload</Link>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {!isLoggedIn && <Link to="/login">Login</Link>}
    </nav>
  );
};

export default Navbar;
