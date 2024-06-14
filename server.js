const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

const metadataFilePath = './metadata.json';

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle video upload
app.post('/upload', upload.single('video'), (req, res) => {
    const videoMetadata = {
        filename: req.file.filename,
        title: req.body.title,
        description: req.body.description,
        uploadTime: Date.now(),
        url: `/uploads/${req.file.filename}`
    };

    // Save metadata
    const metadata = JSON.parse(fs.readFileSync(metadataFilePath));
    metadata.push(videoMetadata);
    fs.writeFileSync(metadataFilePath, JSON.stringify(metadata));

    res.json({ success: true });
});

// Endpoint to fetch videos metadata
app.get('/videos', (req, res) => {
    const metadata = JSON.parse(fs.readFileSync(metadataFilePath));
    res.json(metadata);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
