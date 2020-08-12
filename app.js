const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const urlParser = bodyparser.urlencoded({extended:true});
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
const quesmodel = mongoose.model('question',model.queSchema);
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
app.get('/createquiz',(req,res)=>{
    res.render("createquiz")
})
app.post('/insertques', urlParser ,(req,res)=>{
    res.render("insertques",{data:req.body})
})
app.post('/submitques',urlParser,(req,res)=>{
    var newquiz =  quizmodel({quizId:req.body.quizId}).save(function(err,data){
        if(err) throw err;
    })
    var newques =  quesmodel(req.body).save(function(err,data){
        if(err) throw err;
    })
     res.render("insertques",{data:req.body})
})