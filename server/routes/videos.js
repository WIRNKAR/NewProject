const express = require('express');
const router = express.Router();
const { verifyToken, adminOnly } = require('../middleware/auth');
const fileController = require('../controllers/fileController');

router.get('/', fileController.listVideos);
router.delete('/:id', verifyToken, adminOnly, fileController.deleteVideo);

module.exports = router;
