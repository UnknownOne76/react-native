const exp = require('express') , mongo = require('mongoose');
const userRt = require('./routes/userData');
const postRt = require('./routes/postRouter'); 
const likesRt = require('./routes/likes');
const followRt = require('./routes/follow');
const app = exp() , port = 3030 , url = "mongodb+srv://uk_76:uk_76@firstdatabase.asyfgny.mongodb.net/?retryWrites=true&w=majority";
app.use(exp.json());
app.use(userRt , postRt , likesRt, followRt);  

mongo.connect(url).then(() => {
    console.log('Connected!'); 

    app.listen(port , () => {
        console.log(`Listening on http://localhost:${port}.`); 
    })
}); 

