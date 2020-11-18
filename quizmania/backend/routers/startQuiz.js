module.exports = (app, server) => {

    // require necessary dependencies
    const mongoose = require('mongoose')
    
    // require the user schema to save the users  
    const users_model = require("../databaseModel/users")

    // compile the schema to modal
    const usermodel = mongoose.model('user', users_model.usersListSchema);
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());

    // require socket io for establishing real time connections
    const socket = require('socket.io');
    const io = socket(server);

    var user = {
        user_id: 0,
        disconnected: true
    }
    var host = {
        disconnected :true,
        notUpdated :true
    }


    const getQuizData = (quiz_id) => {
        return new Promise((resolve, reject) => {
            usermodel.findOne({ quiz_id: quiz_id }).then((response, err) => {
                if (err) reject(err)
                resolve(response)
            })
        })
    }


    const checkIfSaved = (response, user_id) => {
        if (response) {
            return response.users.find(user => user.user_id === user_id)
        }

        else return false
    }

//  method to save new users to the database 
  const saveUser = (userdata, quiz_id)=>{  

        //  returning promise to handle errors when function called

            // resolve means success and reject means failure
      return new Promise (function(resolve,reject){

        // finding the quizId if there is one 
        usermodel.findOne({ quiz_id: quiz_id }, (err, response) => {

            // if anytype of error occurs return with reject
            if(err) reject(err)

            

            // if there is no previous record of the user at the quiz id 
            if (response == null) {
                
                //  initializing new user to be stored
            var newuser = usermodel({
                quiz_id: quiz_id,
                userList: userdata
            })
                // save it as a new entry 
                newuser.save().then(() => {

                    // call the sucess function
                    resolve()
                })
            }

            // if a entry already present 
            else {

                // push the user to the userlist of the response   
                response.userList.push(userdata)

                // resave the updated response
                response.save().then(() => {

                    // call the sucess function
                    resolve()
                })
            }
        })

      })

       

    }


//  the method to handle all the realtime connection and events

    // called when any new connection establish
    io.on('connection', socket => {
        console.log("new socket connection");

        socket.on('start',(data)=>{
            io.to(data).emit('startquiz')
        })
  
        
        // handling a update socket event that is called from the client side on connection
        
        // data consist of the details of the  particular user like the username and the quiz id on which the user has joined
        socket.on('update_socket', (data) => {
            const quiz_id = data.quiz_id

            // setting socket username to the username of the player to be used anywhere 
            socket.username = data.username;

            // setting socket quiz_id to the quiz id at which  the player has joined be used anywhere 
            
            socket.quiz_id = quiz_id
            socket.join(quiz_id)
            

            console.log(socket.username + "connected on quiz id " + socket.quiz_id);
            
            userdata = {
                username : socket.username,
                score : 0
            }

            //  saving the new user to the database

            saveUser(userdata,socket.quiz_id).then(()=>{
                var userlist = io.sockets.adapter.rooms[quiz_id]
                var length = userlist ? userlist.length : 0
                // after saved emiting the update userlist that the client side wil listen and update the number of users 
                io.to(quiz_id).emit('update_user_list',socket.quiz_id)
                io.emit('sent_update',length)

             })         
        })

    
        // when socket disconnects like leave in behind or quiz is completed
        socket.on('disconnect', () => {
            
            // an empty array for the  users left
            var newuserList = []
            
            //  finding the quiz_id entry 
            usermodel.findOne({quiz_id:socket.quiz_id},(err,response)=>{
                
                //  if response is not null which will be the case most of the times 
                if(response!=null) 
                { 
                    // getiing the userlist  this currently has the diconnected user saved
                    var userList = response.userList
                    
                    // checking every username of the userlist
                    for (let i = 0; i < userList.length; i++) {
                        var username = userList[i].username

                        // if it not matches the username
                       if(username != socket.username)
                       {

                        const user ={     
                            username: username,
                             score:0
                        } 

                        // push into the new user list 
                        newuserList.push(user)
                        console.log(newuserList);
                       }    
                        
                    } 

                    //  setting the userlist of response with the new userlist created
                    response.userList=newuserList

                    // saving in the database
                    response.save().then(() => {

                        // again calling the update userlist event to be listen at client side
                    io.to(socket.quiz_id).emit('update_user_list',socket.quiz_id)
                    var userlist = io.sockets.adapter.rooms[socket.quiz_id]
                    var length = userlist ? userlist.length : 0
                    io.emit('sent_update',length)


                    console.log(socket.username + " disconnected");
                    
                })
                    
            }                   
            })
        })
    })


    // handling the get request that client will make for updating userlists
     app.get('/getusers/:quiz_id',(req,res)=>{

        // geting the quiz_id 
        const quiz_id = parseInt(req.params.quiz_id);

        //  finding the  entries for the quiz id 
        usermodel.findOne({quiz_id:quiz_id},(err,response)=>{
            if(err) 
                console.log(err);
            else
            //  sending the response
            res.send(response)
        })

     })

        


}