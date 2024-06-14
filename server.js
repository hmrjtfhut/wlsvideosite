const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

const metadataFilePath = './uploads/metadata.json';

// Create the uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Create metadata file if it doesn't exist
if (!fs.existsSync(metadataFilePath)) {
    fs.writeFileSync(metadataFilePath, JSON.stringify([]));
}

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle video upload
app.post('/upload', upload.single('video'), (req, res) => {
    const videoMetadata = {
        filename: req.file.filename,
        title: req.body.title,
        description: req.body.description,
        uploadTime: Date.now()
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
