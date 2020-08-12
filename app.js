const express = require('express');
const mongoose = require('mongoose');
const {Quiz, Questions} = require('./models/quizmania');

const app = express();

mongoose.connect('mongodb://localhost/quizmania', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(function(){

            app.listen(3000, function(){

                console.log('Listening at port 3000...')

            });

        })
        .catch(function(err){

            console.log(err);

        });

mongoose.connection.once('open', function(){

    console.log('Connected to database...');

}).on('error', function(error){
    console.log('Database connection error: ', error);
});

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', function(req, res){

    res.render('index');

});

app.get('/create_quiz', function(req, res){

    res.render('create_quiz');

});

app.post('/insert', function(req, res){

    let _id = req.body.id;                  //req.body = post data coming from action tag in a form

    const quiz = new Quiz({quizId: _id});      //saving quizId to DB

    quiz.save().then(function(result){

        res.redirect('/insert/' + result._id);  //here result._id is the id of DB
                                                //this will help in generating diff link for diff quiz

    });

})

app.get('/insert/:id', function(req,res){

    const _id = req.params.id;

    Quiz.findById(_id)                          //for verifying if that db exist with that id
        .then(function(result){

            console.log(result);
            res.render('insert', {data: result});       //passing data: result so that
                                                        // we can redirect to same page
                                                        //for adding more ques after clicking submit button

        });

});

app.post('/insert/:id', function(req,res){      //runs as soon as submit button is

    const _id = req.params.id;

    Quiz.findById(_id)                      //for verifying if db exist before saving data
        .then(function(result){

            console.log(req.body);          //conatins ques and ans

            result.questions.push(req.body);    //result.questions refers to questions array
            console.log(result.questions);
            result.save()
                    .then(function(){

                        res.redirect(_id);      //doubt

                    });

        })

})

app.get('/start_id', function(req, res){

    res.render('start_id');

})

app.post('/start_id', function(req, res){

    const _id = req.body.id;            //req.body = post data

    Quiz.findOne({quizId: _id})         //{condition: value}
        .then(function(result){

            console.log(result);
            res.render('start_quiz', {data: result});

        })

})