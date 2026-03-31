// Error handling for the endpoints in questions.js

const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET endpoint to retrieve questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// POST endpoint to create a new question
router.post('/questions', async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
});

module.exports = router;