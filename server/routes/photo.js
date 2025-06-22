const express = require('express');
const router = express.Router();
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;
const { verifyToken, requireRole } = require('../middleware/auth');
const Photo = require('../models/Photo');

// Configure multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ GET: Fetch all photos (public)
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    console.error('Error fetching photos:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST: Upload photo (master only)
router.post(
  '/upload',
  verifyToken,
  requireRole('master'),
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        async (err, result) => {
          if (err) {
            console.error('Cloudinary error:', err);
            return res.status(500).json({ error: 'Upload to Cloudinary failed' });
          }

          try {
            const photo = await Photo.create({
              title: req.body.title,
              imageUrl: result.secure_url,
              uploadedBy: req.user.id, // Optional
            });

            return res.status(201).json(photo);
          } catch (dbError) {
            console.error('Database save error:', dbError);
            return res.status(500).json({ error: 'Failed to save photo' });
          }
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    } catch (err) {
      console.error('Unexpected error during upload:', err);
      return res.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
);

module.exports = router;
