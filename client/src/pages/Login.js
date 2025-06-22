import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Only redirect if user is already logged in AND on /login
  if (token && role && window.location.pathname === '/login') {
    if (role === 'master') navigate('/upload');
    else if (role === 'guest') navigate('/gallery');
  }
}, [navigate]);


  const login = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', {
        username,
        password,
      });

      const { token, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'master') {
        navigate('/upload');
      } else if (role === 'guest') {
        navigate('/gallery');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') login();
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUser(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPass(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={login} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
