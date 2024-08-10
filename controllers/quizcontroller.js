const Quiz = require('../models/Quiz');

// Create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get the active quiz
exports.getActiveQuiz = async (req, res) => {
    try {
        const now = new Date();
        const quiz = await Quiz.findOne({ status: 'active', startDate: { $lte: now }, endDate: { $gt: now } });
        if (!quiz) {
            return res.status(404).json({ error: 'No active quiz found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get the quiz result after it ends
exports.getQuizResult = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const now = new Date();
        if (now <= quiz.endDate) {
            return res.status(400).json({ error: 'Quiz is still ongoing or hasn’t finished yet.' });
        }

        res.json({ rightAnswer: quiz.rightAnswer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
