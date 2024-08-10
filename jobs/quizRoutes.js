const express = require('express');
const router = express.Router();
const {
    createQuiz,
    getActiveQuiz,
    getQuizResult,
    getAllQuizzes
} = require('./controllers/quizController');

// POST /quizzes - Create a new quiz
router.post('/quizzes', createQuiz);

// GET /quizzes/active - Get the active quiz
router.get('/quizzes/active', getActiveQuiz);

// GET /quizzes/:id/result - Get the quiz result
router.get('/quizzes/:id/result', getQuizResult);

// GET /quizzes/all - Get all quizzes
router.get('/quizzes/all', getAllQuizzes);

module.exports = router;
