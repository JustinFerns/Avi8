const router = require('express').Router();
const Question = require('../models/Question');

router.get('/', async (req, res) => {
  const questions = await Question.find().limit(10);
  res.json(questions);
});

router.get('/mock', async (req, res) => {
  const questions = await Question.aggregate([{ $sample: { size: 20 } }]);
  res.json(questions);
});

module.exports = router;
