const mongoose = require('mongoose')
const schema = mongoose.Schema;

const QuestionSchema = new schema({

    question: {

        type: String,
        required: true

    },

    option_1: {

        type: String,
        required: true

    },

    option_2: {

        type: String,
        required: true

    },

    option_3: {

        type: String,
        required: true

    },

    option_4: {

        type: String,
        required: true

    },

    answer: {

        type: String,
        required: true

    }


});

const QuizSchema = new schema ({

    quizId: {

        type: String,
        required: true

    },

    questions: [QuestionSchema]

});

const Questions = mongoose.model('questions', QuestionSchema);
const Quiz = mongoose.model('quizzes', QuizSchema);

module.exports = {Questions, Quiz};