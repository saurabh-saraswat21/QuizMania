const mongoose = require('mongoose');
const schema = mongoose.Schema;

const onlyquestions = new schema({
    questionString :{
        type:String,
        required:true
    },
    option1 : {
        type:String,
        required:true
    },
    option2 : {
        type:String,
        required:true
    },
    option3 : {
        type:String,
        required:true
    },
    option4 : {
        type:String,
        required:true
    },
    correct : {
        type:String,
        required:true
    }
    
})

const queSchema = new schema({
    quizId: {
        type: Number,
        required: true
    },
    questionString :{
        type:String,
        required:true
    },
    option1 : {
        type:String,
        required:true
    },
    option2 : {
        type:String,
        required:true
    },
    option3 : {
        type:String,
        required:true
    },
    option4 : {
        type:String,
        required:true
    },
    correct : {
        type:String,
        required:true
    }
});
const QuizSchema = new schema({
    quizId: {
        type: Number,
        required: true
    },
    questions: [onlyquestions]
});
module.exports={
    queSchema : queSchema,
    QuizSchema: QuizSchema
};