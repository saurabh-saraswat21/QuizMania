const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true});
const QuizMania = require('./models/quizmania');

mongoose.connect('mongodb://localhost/quiz', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', function(){

    console.log('connection successfull');

}).on('error', function(error){

    console.log('connection error: ', error);

});

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res){

    res.render('index');

}).listen(3000);

app.get('/insert', function(req, res){

    res.render('insert');

});

app.post('/insert', urlencodedParser , function(req, res){
    
    let a = req.body.ques;
    let b = req.body.opt1;
    let c = req.body.opt2;
    let d = req.body.opt3;
    let e = req.body.opt4;

    const quiz = new QuizMania({

        question: a,
        option_1: b,
        option_2: c,
        option_3: d,
        option_4: e

    });

    quiz.save();
    res.render('saved');

});

app.get('/start', function(req, res){

    res.render('start');

})

