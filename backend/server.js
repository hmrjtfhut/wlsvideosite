const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Routes
app.post('/upload', upload.single('video'), (req, res) => {
    res.json({ message: 'Video uploaded successfully!', file: req.file });
});

app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    // Here you would handle authentication (e.g., check username and password)
    res.json({ message: `Welcome, ${username}!` });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
