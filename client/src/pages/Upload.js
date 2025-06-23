import { useState } from 'react';
import API from '../utils/api';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const upload = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("You're not logged in. Please log in to upload.");
      return;
    }

    if (!file || !title) {
      alert('Please provide both a title and a file.');
      return;
    }

    const form = new FormData();
    form.append('image', file);
    form.append('title', title);

    console.log('📤 Uploading with title:', title);
    console.log('📁 File to upload:', file);

    try {
      const res = await API.post('/photos/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('✅ Upload successful:', res.data);
      alert('Uploaded!');
    } catch (err) {
      console.error('❌ Upload failed:', err?.response?.data || err.message);
      alert('Upload failed: ' + (err?.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files[0])}
      />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
