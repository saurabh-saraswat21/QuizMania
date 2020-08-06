const express = require('express');

const mongoose = require('mongoose');
// quiz model import
const Quiz = require('./models/quiz');

let db;

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
    res.render('index.ejs');
})
// create quiz route
app.get('/create-quiz', (req, res) => {
    res.render('Create-Quiz');
})
// post request and route to add-question and create database for each quiz

app.post('/add-question', (req, res) => {
    let a = req.body.quizId;
    console.log(a);

    const quiz = new Quiz({ quizId: 'bhanu' });
    quiz.save()
        .then((result) => {
            res.redirect('/add-question');
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/add-question', (req, res) => {
    res.render('add-question');
})


