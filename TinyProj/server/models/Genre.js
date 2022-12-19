const mongo = require('mongoose'); 

const { Schema , model } = mongo;

const genreSchema = new Schema({
    genres: []
});

const genreTypes = model("Genres" , genreSchema); 

module.exports = genreTypes; 

