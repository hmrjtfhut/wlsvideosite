const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Serve static files
app.use(express.static('public'));

// Handle video upload
app.post('/upload', upload.single('video'), (req, res) => {
    res.json({ success: true, filename: req.file.filename });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
