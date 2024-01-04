const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    todo : {
        type : String,
        required : true,

    },
    data : {
        type : Date,
        default : Date.now
    }
})


module.exports = mongoose.model('todo', TodoSchema)