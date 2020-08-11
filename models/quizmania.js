const mongoose = require('mongoose')
const schema = mongoose.Schema;

const QuizManiaSchema = new schema({

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

    }


});

const QuizMania = mongoose.model('quizzes', QuizManiaSchema);

module.exports = QuizMania;