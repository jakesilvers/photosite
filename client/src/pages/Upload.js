import { useState } from 'react';
import API from '../utils/api';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const upload = async () => {
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('✅ Upload successful:', res.data);
      alert('Uploaded!');
    } catch (err) {
      console.error('❌ Upload failed:', err?.response?.data || err.message);
      alert('Upload failed');
    }
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
