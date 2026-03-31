const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/avi8');

app.use('/api/questions', require('./routes/questions'));

app.listen(5000, () => console.log('Server running on port 5000'));
