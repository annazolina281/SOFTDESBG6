require('dotenv').config(); // This MUST be the first line
const express = require('express');
const cors = require('cors');
const upload = require('./middleware/upload');
const mediaController = require('./controllers/mediaController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check (To verify the server is live in the browser)
app.get('/', (req, res) => {
    res.send('Zolina Backend API: Online 🚀');
});

// This is the route the Frontend (Albano) will call
app.post('/api/upload', upload.single('image'), mediaController.uploadImage);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));