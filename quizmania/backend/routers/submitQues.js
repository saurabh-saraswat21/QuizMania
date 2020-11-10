module.exports = (app) => {
    const mongoose = require('mongoose')
    const model = require("../databaseModel/quizdata")
    const quesmodel = mongoose.model('question', model.queSchema);
    const quizmodel = mongoose.model('quiz', model.QuizSchema);
    const bodyParser = require('body-parser');
    var ObjectId = require('mongodb').ObjectID;
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());

    app.post('/submitques', (req, res) => {
        var ques = {
            questionString: req.body.questionString,
            option1: req.body.option1,

            option2: req.body.option2,

            option3: req.body.option3,

            option4: req.body.option4,

            correct: req.body.correct
        }
        var quiz_id = (req.body.quiz_id);
        quizmodel.findOne({ quiz_id: quiz_id }, (err, response) => {
            if (err) return handleError(err);
            if (response == null) {
                var newq = quizmodel({ quiz_id: quiz_id, questions: ques });
                newq.save().then((result) => {
                    console.log("new quiz created")
                })
            }
            else {
                response.questions.push(ques)
                response.save().then(() => {
                    console.log("old quiz updated");
                })
            }

        })
        var newques = quesmodel(req.body).save()
            .then(function (data) {
                console.log("saved")
            });

    })

    app.post('/editques',(req)=>{

         const quiz_id = req.body.quiz_id;
         const id = req.body._id;

         const question = {
             questionString : req.body.questionString,
             option1: req.body.option1,
             option2: req.body.option2,
             option3: req.body.option3,
             option4: req.body.option4,
             correct: req.body.correct,
             
         }
         quizmodel.update (
             {"quiz_id" :quiz_id,"questions._id":id},
             {
                 "$set":{
                     "questions.$":question
                 }
             }
         ).then(console.log("hii"))       
    })
                
    })
}
