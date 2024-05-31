const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Pays = require('./models/Pays');

const app = express();
const port = 3000;

// Middleware
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/paysDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Routes
app.get('/api/pays', async (req, res) => {
  try {
    const pays = await Pays.find().select('name population');
    res.json(pays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/pays/:pattern', async (req, res) => {
  const { pattern } = req.params;
  console.log('patter: '+pattern);
  try {
    const regex = new RegExp(pattern, 'i');
    const pays = await Pays.find({ 'name.common': { $regex: regex } });
    res.json(pays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});