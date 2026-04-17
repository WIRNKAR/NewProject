const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    originalName: String,
    fileSize: Number,
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    mimeType: String,
    url: String
});

module.exports = mongoose.model('Video', videoSchema);
