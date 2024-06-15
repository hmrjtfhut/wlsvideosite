const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// Use multer to handle file uploads
const upload = multer({ dest: 'public/uploads/' });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle video upload
app.post('/api/upload', upload.single('video'), (req, res) => {
    const videoMetadata = {
        filename: req.file.filename,
        title: req.body.title,
        description: req.body.description,
        uploadTime: Date.now(),
        url: `/uploads/${req.file.filename}`
    };

    // Save metadata
    const metadataFilePath = './metadata.json';
    let metadata = [];
    if (fs.existsSync(metadataFilePath)) {
        metadata = JSON.parse(fs.readFileSync(metadataFilePath));
    }
    metadata.push(videoMetadata);
    fs.writeFileSync(metadataFilePath, JSON.stringify(metadata));

    res.json({ success: true });
});

// Endpoint to fetch videos metadata
app.get('/api/videos', (req, res) => {
    const metadataFilePath = './metadata.json';
    if (fs.existsSync(metadataFilePath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataFilePath));
        res.json(metadata);
    } else {
        res.json([]);
    }
});

module.exports = app;
