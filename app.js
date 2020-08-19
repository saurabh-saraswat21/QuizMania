const express = require("express");
const mongoose = require('mongoose');

const app = express();
const port = 80;
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const indexcreateinsert =require('./controllers/indexcreateinsert');
mongoose.connect('mongodb://localhost:27017/quizmania', { useNewUrlParser: true, useUnifiedTopology: true })



.then((result) => { app.listen(port, () => { console.log('Listening..') }) })
.catch((err) => console.log(err));

mongoose.connection.once('open', () => {
    console.log('connection made');
}).on('err', (err) => {
    console.log(err);
})

indexcreateinsert(app);