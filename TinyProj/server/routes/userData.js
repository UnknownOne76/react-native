const exp = require('express'); 
const User = require('../models/User') , jwt = require('jsonwebtoken') , userRt = exp.Router(); 
const JWT_SECRET = "LtscoEMqX3iYSBP8LR10MHxKGcyIT4pxYgT1TBx2PUx9VM33tBgrwvB0cdmEep4owqNL5JWwdmUobWvIj69eX5kDCtNKkiHTxh31EGcvuMxr1P"; 

userRt.get("/", async (req, res) => {
    const users = await User.find().populate('followers').populate('following').lean();
    res.send({
      data: users,
    });
  });

  userRt.post("/users", async (req, res) => {
    const { name, email , password , img } = req.body;
    const oldUser = await User.findOne({email: email});
    if ( oldUser ) {
       res.send('User was here before.'); 
    } 
    else {
      await User.create({
        name: name,
        email: email,
        password: password, 
        img: img,
      });
      res.send({
        message: "User has been created.",
      });
    }; 
  });


  userRt.post('/login' , async (req , res) => {
    const { email , password } = req.body; 
    const user = await User.findOne({email: email}); 
    if (user) {
       const token = jwt.sign({email: user.email} , JWT_SECRET);
       if (password === user.password) {  
         res.send({
           msg: 'Logged in!', 
           token: token
         })
       }
       else {
         console.log(password , user.password); 
         return res.send('Incorrect password.');
       }
   }
   else {
      res.send('User not found.'); 
      return 0; 
   }
 }); 

 userRt.post('/userDet' , async (req , res) => {
    const { token } = await req.body;    
    const user = jwt.verify(token , JWT_SECRET);
    await User.findOne({email: user.email}).populate('followers').populate('following').then((data) => {
      res.send(data); 
    });   
}); 

module.exports = userRt;