    const mongoose = require('mongoose')
    const users_model = require("../DatabaseModel/users")
    const usermodel = mongoose.model('user', users_model.usersListSchema);
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());

    const socket = require('socket.io');
    const io = socket(server);

    io.on('connection', socket => {
        console.log("new socket connection");
                
        })
