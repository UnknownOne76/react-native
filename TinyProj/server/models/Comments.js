const mongo = require('mongoose'); 

const { Schema , model } = mongo;

const commentSchema = new Schema({
        author: {
            type: Schema.ObjectId, 
            ref: "Users", 
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now,
            required: true
        },    
        reply: [{ type: Schema.ObjectId, ref: 'Comments' }]
}, {timestamps: true});

const cmts = model("Comments" , commentSchema);
 
module.exports = cmts;