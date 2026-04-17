const express = require('express');
const router = express.Router();
const { verifyToken, adminOnly } = require('../middleware/auth');
const fileController = require('../controllers/fileController');

router.get('/', fileController.listProductImages);
router.delete('/:id', verifyToken, adminOnly, fileController.deleteProductImage);

module.exports = router;
