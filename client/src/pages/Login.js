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
    if (token && role) {
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

      if (role === 'master') navigate('/upload');
      else if (role === 'guest') navigate('/gallery');
      else navigate('/');
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
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUser(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPass(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
        <button onClick={login} disabled={loading} style={styles.button}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '0.5rem',
  },
};
