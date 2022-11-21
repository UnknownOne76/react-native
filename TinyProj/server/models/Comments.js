const mongo = require('mongoose'); 

const { Schema , model } = mongo;

const cmt = new Schema({
    author: {
        type: Schema.ObjectId,
        ref: "Users", 
        required: true
    }, 

})

const cmts = model("Comments" , cmt);
 
module.exports = cmts;