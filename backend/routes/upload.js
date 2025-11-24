const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { auth } = require('../middleware/auth');

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed'));
    }
  }
});

// Upload image
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = process.env.UPLOAD_PATH || './uploads';
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(req.file.originalname)}`;
    const filepath = path.join(uploadDir, filename);

    // Optimize and resize image
    await sharp(req.file.buffer)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 85 })
      .toFile(filepath);

    // Generate URL
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;

    res.status(200).json({
      message: 'Image uploaded successfully',
      image_url: imageUrl,
      filename: filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;