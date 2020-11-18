module.exports=(app)=>{

const mongoose = require('mongoose')
const Quizmodel = require("../databaseModel/quizdata")
const HostQuizModelSchema = require("../databaseModel/hostquizdata")
const quizmodel = mongoose.model('quiz', Quizmodel.QuizSchema);
const hostmodel = mongoose.model('hostquiz', HostQuizModelSchema.hostquizDataScema);
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
app.post('/deletequiz',(req,res)=>{
    const quiz_id = req.body.quiz_id;
    quizmodel.findOneAndDelete({quiz_id:quiz_id}).then((result)=>console.log(result))

})



}