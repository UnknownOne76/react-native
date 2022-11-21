const exp = require('express') , mongo = require('mongoose');
const userRt = require('./routes/userData');
const postRt = require('./routes/postRouter'); 
const app = exp() , port = 3030 , url = "mongodb://127.0.0.1:27017/asterNews";
app.use(exp.json());
app.use(userRt , postRt); 

mongo.connect(url).then(() => {
    console.log('Connected!'); 

    app.listen(port , () => {
        console.log(`Listening on http://localhost:${port}.`); 
    })
}); 

