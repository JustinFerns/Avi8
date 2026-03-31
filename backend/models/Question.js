const router = require('express').Router();
const Question = require('../models/Question');

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().limit(10);
    res.json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

router.get('/mock', async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 20 } }]);
    res.json(questions);
  } catch (err) {
    console.error('Error fetching mock questions:', err);
    res.status(500).json({ error: 'Failed to fetch mock questions' });
  }
});

module.exports = router;
