require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const authRoutes = require('./routes/auth');
const photoRoutes = require('./routes/photo');

const app = express();

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ CORS setup
app.use(cors({
  origin: ['https://jakesilvers.com', 'https://photosite-lfbz.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ JSON parsing
app.use(express.json());

// ✅ Basic test route for Render
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);

// ✅ DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
