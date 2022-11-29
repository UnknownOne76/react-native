const mong = require('mongoose'); 
const { Schema , model } = mong;

const ls = new Schema({
     postImg: {
      type: String,
      maxLength: 2000,
     },  
     title:{
       type: String, 
       maxLength: 2000, 
       required: true, 
     },  
     descrip: {
      type: String,
      maxLength: 3000, 
      required: true
     },  
     txt: {
      type: String,
      maxLength: 5000, 
      required: true
     }, 
     author: {
         type: Schema.ObjectId, 
         ref: "Users",  
         required: true,
     }, 
     comments: [{
      author: {
        type: Schema.ObjectId,
        ref: "Users", 
        required: true
      }, 
      comment: {
      type: String,
      required: true
      }, 
      replies: [{
         type: Schema.ObjectId, 
         ref: "Comments",
      }]
     }], 
     type: {
         type: String, 
         required: true
     }
}, { timestamps: true });

const newsPosts = model('Posts' , ls); 
module.exports = newsPosts; 