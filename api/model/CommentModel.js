
const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    idProduct:{
        type: String,
        require: true
    },
    author: {
        type: String
    },
    content:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
},{
   collection:"Comment" 
});

module.exports = mongoose.model('Comment', CommentSchema);