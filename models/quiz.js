const mongoose = require('mongoose');
const schema = mongoose.Schema;

const QuestionSchema = new schema({
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});
const QuizSchema = new schema({
    quizId: {
        type: String,
        required: true
    },
    questions: [QuestionSchema]
});
const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;