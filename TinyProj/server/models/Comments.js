const mongo = require('mongoose'); 
const Populate = require('../autopop');

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
        reply: [{ type: Schema.ObjectId, ref: 'Comments' }],
        likes: [],
        likeCnt: {type: Number , default: 0 , required: true},
        disLikes: [], 
        disCnt: {type: Number , default: 0 , requied: true} 
}, {timestamps: true});

commentSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))
  .pre('findOne', Populate('reply'))
  .pre('find', Populate('reply'));

const cmts = model("Comments" , commentSchema);
 
module.exports = cmts;