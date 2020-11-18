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
        disconnected: true,
        notUpdated: true
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

    const deleteUser = (quiz_id, user_id) => {

        return new Promise((resolve, reject) => {

            usermodel.findOne({ quiz_id: quiz_id }, (err, response) => {
                if (err) reject(err)
                const retUser = checkIfSaved(response, user_id)
                if (retUser) {
                    usermodel.updateOne(
                        { "quiz_id": quiz_id },

                        {
                            $pull: {
                                "users": { "user_id": user_id }
                            }
                        }
                    ).then((stats) => {

                        resolve(stats)

                    })
                }
            })

        })
    }
    //  method to save new users to the database 
    const saveUser = (userData, quiz_id) => {

        //  returning promise to handle errors when function called

        // resolve means success and reject means failure
        return new Promise((resolve, reject) => {

            // finding the quizId if there is one 
            usermodel.findOne({ quiz_id: quiz_id }, (err, response) => {

                // if anytype of error occurs return with reject
                if (err) reject(err)



                // if there is no previous record of the user at the quiz id 
                if (response == null) {

                    //  initializing new user to be stored
                    var newuser = usermodel({
                        quiz_id: quiz_id,
                        users: userData
                    })
                    // save it as a new entry 
                    newuser.save().then((data) => {
                        console.log("saved");

                        // call the sucess function
                        resolve(data)
                    })
                }

                // if a entry already present 
                else {

                    const retUser = checkIfSaved(response, userData.user_id)
                    if (retUser) {
                        console.log("Already exist");
                        resolve(response)
                    }
                    else {
                        // push the user to the userlist of the response   
                        response.users.push(userData)

                        // resave the updated response
                        response.save().then((data) => {
                            console.log("saved");
                            // call the sucess function
                            resolve(data)
                        })
                    }


                }
            })

        })



    }


    //  the method to handle all the realtime connection and events

    // called when any new connection establish
    io.on('connection', socket => {

        socket.on('start', (data) => {
            io.to(data).emit('startquiz')
        })


        socket.on('host_connected', (quiz_id) => {

            socket.host_id = quiz_id
            socket.join("host" + quiz_id)
            host.disconnected = false

            console.log("host of  quiz_id " + quiz_id + " connected");

            if (!host.disconnected && host.notUpdated) {
                getQuizData(socket.host_id).then((data) => {
                    io.to("host" + data.quiz_id).emit('update', data.users)
                    host.notUpdated = false
                }).catch((err) => {
                    console.log(err);
                })
            }


        })

        socket.on('quiz_ended', (data) => {
            const sentdata = {
                scores: data,
                username: socket.username
            }
            io.to("host" + socket.quiz_id).emit('a_quiz_ends', sentdata)

        })

        socket.on('user_connected', (data) => {


            const { quiz_id, username, user_id } = data
            user.user_id = user_id

            socket.username = username;
            socket.quiz_id = quiz_id
            socket.user_id = user_id

            socket.join(quiz_id)
            host.notUpdated = true

            user.disconnected = false;

            console.log(socket.username + "connected on quiz id " + socket.quiz_id);


            const userData = {
                username: username,
                user_id: user_id
            }

            saveUser(userData, quiz_id).then((data) => {

                io.to(quiz_id).emit('update_user_list', data)


            })
        })

        socket.on('client_is_updated', (data) => {

            if (host.notUpdated) {
                io.to("host" + data.quiz_id).emit('update', data.users)
                host.notUpdated = false
            }


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