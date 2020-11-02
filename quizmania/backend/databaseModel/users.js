const mongoose = require('mongoose');
const schema = mongoose.Schema;

//  The user schema that will store the information of guest users or not signed up users but want to play quiz

// The database will store information of the user temporarily and details will be deleted as soon as they leave the quiz  


//  a single user schema that contain info of a single user
// wont be used directly to store the data but rather act as a dataype

const userSchema = new schema({

    // username of the player
    username :{
        type:   String,
        required:true
    },

    // score of the player
    score :{ 
        type:Number,
        }

})


// userlist schema that contain all the users of a particular quiz 
const usersListSchema = new schema ({

    // quiz_id of the quiz
    quiz_id : {
        type: Number,
        required: true
    },

    // list of all users connected to the quiz
    userList :{
        type : [userSchema]
    } 

})

// exporting schema  for external use
module.exports={
    usersListSchema: usersListSchema
}