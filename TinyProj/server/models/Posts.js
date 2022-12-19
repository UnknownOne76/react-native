const mong = require('mongoose'), Populate = require('../autopop'); 
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
      type: Schema.ObjectId, 
      ref: "Comments",
     }], 
     type: {
         type: String, 
         required: true
     }, 
     genre: {
        type: String, 
        required: true
     }, 
}, { timestamps: true });

ls
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))
  .pre('findOne', Populate('comments'))
  .pre('find', Populate('comments'));

const newsPosts = model('Posts' , ls); 
module.exports = newsPosts; 