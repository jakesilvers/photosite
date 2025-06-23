import { useState } from 'react';
import API from '../utils/api';
import { motion } from 'framer-motion';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const upload = async () => {
    setError('');
    setSuccess(false);
    if (!file || !title) {
      setError('Please provide both a title and a file.');
      return;
    }

    const form = new FormData();
    form.append('image', file);
    form.append('title', title);

    try {
      await API.post('/photos/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
    } catch (err) {
      setError('Upload failed');
      console.error(err);
    }
  };

  return (
    <div style={styles.page}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        style={styles.card}
      >
        <h2 style={styles.title}>Upload Photo</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          style={styles.input}
        />
        <button onClick={upload} style={styles.button}>Upload</button>
        {success && <p style={styles.success}>✅ Photo uploaded!</p>}
        {error && <p style={styles.error}>{error}</p>}
      </motion.div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: '#111',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    textAlign: 'center',
    marginBottom: '0.5rem',
    color: '#fff',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #555',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#000',
    color: '#fff',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  },
  error: {
    color: '#f55',
    textAlign: 'center',
    marginTop: '0.5rem',
  },
  success: {
    color: '#5f5',
    textAlign: 'center',
    marginTop: '0.5rem',
  },
};
