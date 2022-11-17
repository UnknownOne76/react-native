const exp = require('express') , mongo = require('mongoose');
const User = require('./models/User');
const app = exp() , port = 3030;
app.use(exp.json()); 

mongo.connect('mongodb://localhost:27017/asterNews').then(() => {
    console.log('Connected!'); 

    app.get('/' , async (req , res) => {
        await res.send('Hello'); 
    });
      
    app.listen(port , () => {
        console.log('Listening.'); 
    })
}) 

