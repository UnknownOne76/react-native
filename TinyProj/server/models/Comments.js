const mongo = require('mongoose'); 

const { Schema , model } = mongo;

const commentSchema = new Schema({
        author: {
            type: Schema.ObjectId, 
            ref: "Users", 
        },
        comment: {
            type: String,
        },    
        reply: [commentSchema]
}, {timestamps: true});

const cmts = model("Comments" , commentSchema);
 
module.exports = cmts;