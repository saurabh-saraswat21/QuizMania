const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const model = require("./DatabaseModel/quizdata")
const app = express();
const port = 80;
mongoose.connect('mongodb://localhost:27017/quizmania', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { app.listen(port, () => { console.log('Listening..') }) })
    .catch((err) => console.log(err));

 mongoose.connection.once('open', () => {
        console.log('connection made');
    }).on('err', (err) => {
        console.log(err);
    })
const quesmodel = mongoose.model('ques',model.queSchema);
const quizmodel = mongoose.model('quiz',model.QuizSchema);
 
app.set('view engine','ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.status(200).render("index")
})
app.get('/contact',(req,res)=>{
    res.status(200).render("contact")
    
})
app.get('/insertques',(req,res)=>{
    res.status(200).render("insertques", {qs:req.query});
})
app.post('/insertques',(req,res)=>{
    var newques =  quesmodel(req.body).save(function(err,data){
        if(err) throw err;
    })
    res.redirect("/insertques")
})

 