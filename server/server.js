const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/DreamProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Define the Dream Schema and Model
const DreamSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Dream = mongoose.model('Dream', DreamSchema);

// Define Routes
// Route to upload a new dream
app.post('/api/dreams/upload', async (req, res) => {
    const { content, author } = req.body;
    try {
        const dream = new Dream({ content, author });
        await dream.save();
        res.status(201).json(dream);
    } catch (error) {
        res.status(500).json({ error: 'Error uploading dream' });
    }
});

// Route to get all dreams
app.get('/api/dreams/all', async (req, res) => {
    try {
        const dreams = await Dream.find().sort({ createdAt: -1 });
        res.json(dreams);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching dreams' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
