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

    let _id = req.body.id;

    const quiz = new Quiz({quizId: _id});

    quiz.save().then(function(result){

        res.redirect('/insert/' + result._id);

    });

})

app.get('/insert/:id', function(req,res){

    const _id = req.params.id;

    Quiz.findById(_id)
        .then(function(result){

            console.log(result);
            res.render('insert', {data: result});

        });

});

app.post('/insert/:id', function(req,res){

    const _id = req.params.id;

    Quiz.findById(_id)
        .then(function(result){

            console.log(req.body);

            result.questions.push(req.body);
            console.log(result.questions);
            result.save()
                    .then(function(){

                        res.redirect(_id);

                    });

        })

})