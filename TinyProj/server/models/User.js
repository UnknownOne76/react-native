const mong = require('mongoose');
const { Schema , model } = mong; 

const user = new Schema({
    name: String,
    email: {
        type: String, 
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address should be valid.'], 
        required: true 
    }, 
    password: {
        type: String,
        required: true
    },  
    img: {
       type: String,
       required: true
    },
    followers: [{
        type: Schema.ObjectId, 
        ref: 'Users', 
        required: true
    }], 
    following: [{
        type: Schema.ObjectId, 
        ref: 'Users', 
        required: true, 
    }], 
    notifications: [{
        content: {type: String, required: true}, 
    }], 
    totalSize:{type: Number, required: true, default: 0}     
});

const User = model('Users' , user); 
module.exports = User; 