import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('No token found — redirecting to login');
    navigate('/login');
    return;
  }

  console.log('Using token:', token);

  API.get('/photos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      console.log('Fetched photos:', res.data);
      setPhotos(res.data);
      console.log('Raw photos data:', res.data);
    })
    .catch(err => {
      console.error('Error fetching photos:', err?.response?.data || err.message);
      navigate('/login');
    });
}, [navigate]);


  return (
    <div>
      <h1>Gallery</h1>
      {photos.map(photo => (
        <div key={photo._id}>
          <h3>{photo.title}</h3>
          <img src={photo.imageUrl} alt={photo.title} width={300} />
        </div>
      ))}
    </div>
  );
}
