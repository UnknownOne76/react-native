const exp = require('express') , mongo = require('mongoose');
const userRt = require('./routes/userData');
const postRt = require('./routes/postRouter'); 
const app = exp() , port = 3030 , url = "mongodb+srv://uk_76:uk_76@firstdatabase.asyfgny.mongodb.net/?retryWrites=true&w=majority";
app.use(exp.json());
app.use(userRt , postRt); 

mongo.connect(url).then(() => {
    console.log('Connected!'); 

    app.listen(port , () => {
        console.log(`Listening on http://localhost:${port}.`); 
    })
}); 

