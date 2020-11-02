    const mongoose = require('mongoose')
    const users_model = require("../DatabaseModel/users")
    const usermodel = mongoose.model('user', users_model.usersListSchema);
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());

    const socket = require('socket.io');
    const io = socket(server);


  const saveUser = (userdata, quiz_id)=>{
      return new Promise (function(resolve,reject){

        usermodel.findOne({ quiz_id: quiz_id }, (err, response) => {
            if(err) reject(err)
            var newuser = usermodel({
                quiz_id: quiz_id,
                userList: userdata
            })
            if (response == null) {

                newuser.save().then(() => {
                    resolve()
                })
            }
            else {
                response.userList.push(userdata)
                response.save().then(() => {
                    resolve()
                })
            }
        })

      })

       

    }


    io.on('connection', socket => {
        console.log("new socket connection");
        socket.on('update_socket', (data) => {
            socket.username = data.username;
            socket.quiz_id = data.quiz_id
            console.log(socket.username + "connected on quiz id " + socket.quiz_id);
            userdata = {
                username : socket.username,
                score : 0
            }
            saveUser(userdata,socket.quiz_id).then(()=>{
                io.emit('update_user_list',socket.quiz_id)
             })         
        })
                
    

        socket.on('disconnect', () => {
            var newuserList = []
            usermodel.findOne({quiz_id:socket.quiz_id},(err,response)=>{
                if(response!=null) 
                { 
                    var userList = response.userList
                
                    for (let i = 0; i < userList.length; i++) {
                        var username = userList[i].username
                       if(username != socket.username)
                       {
    
                        const user ={     
                            username: username,
                             score:0
                        } 
                        newuserList.push(user)
                        console.log(newuserList);
                       }    
                        
                    } 
                    response.userList=newuserList
                    response.save().then(() => {
                    io.emit('update_user_list',socket.quiz_id)
                    console.log(socket.username + " disconnected");
                    
                })
                    
            }                   
            })
        })
    })
        })
