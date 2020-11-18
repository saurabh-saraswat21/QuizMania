const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userdataSchema = new schema ({
    username : {
        type: String,
        required : true
    },
    score:{
        type : Number,
        required:true
    }
})


const hostquizDataSchema = new schema({
    quiz_id : {
        type: Number,
        required : true
    },
    total_score: {
        type:Number,
        required:true
    },
    usersdata: {
        type: [userdataSchema],
        required : false
    }
        
    
})
module.exports={
    hostquizDataScema:hostquizDataSchema
}