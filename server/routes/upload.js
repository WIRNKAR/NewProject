const express = require('express');
const router = express.Router();
const { verifyToken, adminOnly } = require('../middleware/auth');
const { uploadVideo, uploadImage } = require('../middleware/upload');
const uploadController = require('../controllers/uploadController');

router.post('/video', verifyToken, adminOnly, uploadVideo.single('video'), uploadController.uploadVideo);
router.post('/product-image', verifyToken, adminOnly, uploadImage.single('image'), uploadController.uploadProductImage);

module.exports = router;
