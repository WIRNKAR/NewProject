const Video = require('../models/Video');
const Product = require('../models/Product');
const path = require('path');

exports.uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const video = new Video({
            fileName: req.file.filename,
            originalName: req.file.originalname,
            fileSize: req.file.size,
            uploadedBy: req.user.id,
            mimeType: req.file.mimetype,
            url: `/assets/videos/${req.file.filename}`
        });

        await video.save();

        res.json({
            success: true,
            message: 'Video uploaded successfully',
            file: {
                fileName: video.fileName,
                url: video.url,
                uploadedAt: video.uploadedAt
            }
        });
    } catch (error) {
        console.error('Upload video error:', error);
        res.status(500).json({ success: false, message: 'Upload failed' });
    }
};

exports.uploadProductImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product ID required' });
        }

        // Delete old image if exists
        const oldProduct = await Product.findOne({ productId });
        if (oldProduct) {
            await Product.deleteOne({ productId });
        }

        const product = new Product({
            productId,
            fileName: req.file.filename,
            imagePath: `/assets/images/products/${req.file.filename}`,
            uploadedBy: req.user.id,
            mimeType: req.file.mimetype
        });

        await product.save();

        res.json({
            success: true,
            message: 'Product image uploaded successfully',
            file: {
                fileName: product.fileName,
                imagePath: product.imagePath,
                productId,
                uploadedAt: product.uploadedAt
            }
        });
    } catch (error) {
        console.error('Upload product image error:', error);
        res.status(500).json({ success: false, message: 'Upload failed' });
    }
};
