const express = require('express');

const mongoose = require('mongoose');
// quiz model import
const { Quiz, Question } = require('./models/quiz');

let db = 1;

// let dbURI =

mongoose.connect('mongodb://localhost/quiztest', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { app.listen(3000, () => { console.log('Listening..') }) })
    .catch((err) => console.log(err));

mongoose.connection.once('open', () => {
    console.log('connection made');
}).on('err', (err) => {
    console.log(err);
})

// express app 
const app = express();

// // Listening to server

// app.listen(3000, () => {
//     console.log('Listening');
// });


// registering view engine
app.set('view engine', 'ejs');
// middleware and
app.use(express.urlencoded({ extended: true }));
// Serving Static file 
app.use(express.static('public'));

// routing using app 
// home page route
app.get('/', (req, res) => {
    res.render('index.ejs', { title: 'Home' });
})
// create quiz route
app.get('/create-quiz', (req, res) => {
    res.render('Create-Quiz');
})
// post request and route to add-question and create database for each quiz

app.post('/add-question', (req, res) => {
    let a = req.body.quizId;
    console.log(a);

    const quiz = new Quiz({ quizId: a });
    quiz.save()
        .then((result) => {
            let redirect = `/add-question/${result._id}`;
            // console.log(result.questions.length);
            res.redirect(redirect)
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/add-question/:id', (req, res) => {
    const id = req.params.id;
    Quiz.findById(id)
        .then((result) => {
            console.log(result.questions);
            res.render('add-question', { quiz: result, title: 'Add Question' })
        })
        .catch((err) => {
            console.log(err);
        });

});

app.post('/add-question/:id', (req, res) => {
    const id = req.params.id;
    Quiz.findById(id)
        .then((record) => {
            // console.log(result);
            record.questions.push(req.body);
            record.save()
                .then((result) => {
                    res.redirect(id);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/start-quiz', (req, res) => {
    res.render('start-quiz', { title: 'start Quiz' });
});

app.post('/answer-the-question', (req, res) => {
    const qid = req.body.quizId;
    console.log(qid);
    Quiz.findOne({ quizId: qid })
        .then((result) => {
            console.log(result)
            if (result !== null) {
                res.render('ans_the_ques', { quiz: result, title: 'answer it' });
            } else {
                res.redirect('404!');
            }
        })
        .catch((err) => {
            console.log(err);
        });
});
app.get('/answer-the-question/:id', (req, res) => {
    const id = req.body.id;
    console.log(id + 'jnksaj');
    Quiz.findById(id)
        .then((result) => {
            res.render('ans_the_ques', { title: 'Answer the Question', quiz: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})


