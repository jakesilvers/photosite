import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload';
import Login from './pages/Login';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={token ? <Gallery /> : <Navigate to="/login" />} />
        <Route path="/upload" element={token ? <Upload /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/gallery" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;