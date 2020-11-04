module.exports=(app)=>{

const mongoose = require('mongoose')
const model = require("../databaseModel/quizdata")
const quizmodel = mongoose.model('quiz', model.QuizSchema);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/viewquizes', (req, res) => {
    quizmodel.find({}, (err, output) => {
        if (err) throw err;
        res.send(output)
    })
})
app.get('/viewquizes/:quiz_id', (req, res) => {
    console.log(req.params.quiz_id)
    quizmodel.findOne({quiz_id: req.params.quiz_id}, (err, output) => {
        if (err) throw err;
        console.log(output)
        res.send(output)
    })
    
})



}