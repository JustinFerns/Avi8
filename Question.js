const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  subject: String
});

module.exports = mongoose.model('Question', QuestionSchema);
