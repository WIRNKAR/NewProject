const Video = require('../models/Video');
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

exports.listVideos = async (req, res) => {
    try {
        const videos = await Video.find().select('-uploadedBy').sort({ uploadedAt: -1 });
        res.json({ success: true, data: videos });
    } catch (error) {
        console.error('List videos error:', error);
        res.status(500).json({ success: false, message: 'Failed to list videos' });
    }
};

exports.deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Video.findByIdAndDelete(id);

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        // Delete file from filesystem
        const filePath = path.join(__dirname, '../../public/assets/videos', video.fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.json({ success: true, message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Delete video error:', error);
        res.status(500).json({ success: false, message: 'Delete failed' });
    }
};

exports.listProductImages = async (req, res) => {
    try {
        const { productId } = req.query;
        let query = {};
        if (productId) {
            query = { productId };
        }
        const products = await Product.find(query).select('-uploadedBy').sort({ uploadedAt: -1 });
        res.json({ success: true, data: products });
    } catch (error) {
        console.error('List product images error:', error);
        res.status(500).json({ success: false, message: 'Failed to list images' });
    }
};

exports.deleteProductImage = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        // Delete file from filesystem
        const filePath = path.join(__dirname, '../../public/assets/images/products', product.fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Delete product image error:', error);
        res.status(500).json({ success: false, message: 'Delete failed' });
    }
};
