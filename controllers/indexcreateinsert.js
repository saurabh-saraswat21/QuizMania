module.exports=function(app)
{
    const bodyparser = require('body-parser')
    const path = require("path");
    const mongoose = require('mongoose');
    const urlParser = bodyparser.urlencoded({extended:true});
    const model = require("../DatabaseModel/quizdata")
    const quesmodel = mongoose.model('question',model.queSchema);
    const quizmodel = mongoose.model('quiz',model.QuizSchema);
    app.set('view engine','ejs');
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
}