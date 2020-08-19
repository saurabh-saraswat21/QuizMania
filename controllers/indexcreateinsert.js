module.exports = function (app) {
    const bodyparser = require('body-parser')
    const mongoose = require('mongoose');
    const urlParser = bodyparser.urlencoded({ extended: true });
    const model = require("../DatabaseModel/quizdata")
    const quesmodel = mongoose.model('question', model.queSchema);
    const quizmodel = mongoose.model('quiz', model.QuizSchema);
    app.set('view engine', 'ejs');
    app.get('/', (req, res) => {
        res.status(200).render("index")
    })
    app.get('/contact', (req, res) => {
        res.status(200).render("contact")

    })
    app.get('/createquiz', (req, res) => {
        res.render("createquiz")
    })
    app.post('/insertques', urlParser, (req, res) => {
        res.render("insertques", { data: req.body })


    })
    app.get('/viewquizes', (req, res) => {
        quizmodel.find({}, (err, output) => {
            if (err) throw err;
            res.render("viewquiz", { quizes: output });
        })
    })
    app.post('/submitques', urlParser, (req, res) => {
        var ques = {
            questionString: req.body.questionString,
            option1: req.body.option1,

            option2: req.body.option2,

            option3: req.body.option3,

            option4: req.body.option4,

            correct: req.body.correct
        }
        var quizId = (req.body.quizId);
        quizmodel.findOne({ quizId: quizId }, (err, response) => {
            if (err) return handleError(err);
            if (response == null) {
                var newq = quizmodel({ quizId: quizId, questions: ques });
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
                res.render("insertques", { data: data })
            });
    })
    app.get("/getQuiz/:id", (req, res) => {
        var quizId = req.params.id;
        quesmodel.find({ quizId: quizId }, (err, output) => {
            if (err) throw err;
            console.log(output)
            res.render("getQuiz",{questions: output});

        })

    });

}