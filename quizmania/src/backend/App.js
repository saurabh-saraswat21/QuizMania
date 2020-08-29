const express = require("express");
const mongoose = require('mongoose');

const app = express();
const port = 80;

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/quizmania', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log('connection made');
}).on('err', (err) => {
    console.log(err);
}).then((result) => { app.listen(port, () => { console.log('Listening..') }) })
    .catch((err) => console.log(err));
