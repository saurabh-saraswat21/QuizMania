const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username :{
        type:   String,
        required:true
    },
    score :{ 
        type:Number,
        }

})
const usersListSchema = new schema ({
    quiz_id : {
        type: Number,
        required: true
    },
    userList :{
        type : [userSchema]
    } 

})

module.exports={
    usersListSchema: usersListSchema
}