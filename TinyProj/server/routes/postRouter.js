const exp = require('express'); 
const cmts = require('../models/Comments');
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

postRt.post('/addCmt/:id' , async (req , res) => {
    const comment = new cmts(req.body);  
    // await newsPosts.updateOne({_id: req.params['id']} , {$push: {comments: {
    //     _id: comment._id
    // }}}).populate('comments').then(res => console.log(res) , res.send('Successfully Sent.')).catch(err => console.log(err));
    comment.save().then(() => newsPosts.findById(req.params['id'])).then((post) => {
      post.comments.unshift(comment);
      return post.save();
    })
    .then(() => res.send('Sent!'))
    .catch((err) => {
      console.log(err);
    }); 
})

postRt.get('/addCmt/:id/addReply/:repId' , async (req , res) => {
    let post;  
    await newsPosts.findById({_id: req.params['id']}).populate('author').lean().then((p) => {
        post = p; 
        return cmts.findById({_id: req.params['repId']}).populate('author').populate('reply').lean(); 
    }).then((comment) => {
       res.send({data: comment});
    }).catch((err) => console.log(err)); 
}); 

postRt.post('/addCmt/:id/addReply/:repId/replies', async (req, res) => { 
    // await newsPosts.findById({_id: req.params['id']}).populate('author').populate('comments').then(async(post) => {
    //   console.log(post); 
    //    await cmts.findByIdAndUpdate({_id: req.params['repId']} , {$push: {reply: {
    //       author: author, 
    //       comment: txt, 
    //    }}}).then((res) => console.log(res) , res.send('Replied!')).catch(err => console.log(err)); 
    // })
  const reply = new cmts(req.body);
  await newsPosts.findById(req.params['id'])
    .then((post) => {
      Promise.all([
        reply.save(),
        cmts.findById(req.params['repId']),
      ]).then(([reply, comment]) => {
          comment.reply.unshift(reply._id);
          return Promise.all([
            comment.save(),
          ]);
        })
        .then(() => res.send('Replied!'))
        .catch(console.error);
      return post.save();
    });
});

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