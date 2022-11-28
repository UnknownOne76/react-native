const exp = require('express'); 
const newsPosts = require('../models/Posts'), postRt = exp.Router(); 

postRt.get("/posts", async (req, res) => {
    if (req.body) { 
      const posts = await newsPosts.find({}).sort({_id: -1}).populate("author").populate('comments');
      res.send({
         data: posts,
      });
    }
    else {
       res.send('data not found.');
       return 0;  
    }
  }) 

postRt.get('/spec/:id' , async (req , res) => {
   const data = await newsPosts.findOne({_id: req.params['id']}).populate("author").populate('comments');  
   if ( data ) {
     res.send(data); 
   } 
   else {
      res.send('Not found.'); 
      return 0; 
   }
})

postRt.post("/post", async (req, res) => {
   const { title, descrip, txt , postImg, userId , comments , type } = req.body;
   try {
     await newsPosts.create({
       title: title,
       descrip: descrip,
       txt: txt,
       postImg: postImg,
       author: userId,
       comments: comments, 
       type: type
     });
     res.send({
       message: "Post added",
     });
   } catch (e) {
     res.send({
       error: e,
     });
   }
 });

module.exports = postRt; 