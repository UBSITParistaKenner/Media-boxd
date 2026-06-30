require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.listen(4700, () => {
    console.log('Server is running on port 4700');
});

mongoose.connect(process.env.MONGODB_URI);

const Media = mongoose.model('watch', new mongoose.Schema({
    title: String, 
    creator: String,  
    mediaType: String, 
    count: Number,  
    verdict: String, 
    notes: String,
}));

// Create
app.get('/api/media', async (req, res) => {
    const list = await Media.find();
    res.send(list);
});

// Read
app.post('/api/media', async (req, res) => {
    const item = new Media(req.body);
    await item.save();
    res.send(item);
});

// Update
app.put('/api/media/:id', async (req, res) => {
    const updated = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updated);
});

// Delete
app.delete('/api/media/:id', async (req, res) => {
    await Media.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});