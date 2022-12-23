const exp = require('express'); 
const cmts = require('../models/Comments');
const genreTypes = require('../models/Genre');
const newsPosts = require('../models/Posts'), postRt = exp.Router();

postRt.get("/posts/:id", async (req, res) => {  
    if (req.body) { 
      const posts = await newsPosts.find(req.params['id'] == 'null' ? {} : {genre: req.params['id']}).sort({_id: -1}).populate("author"); 
      res.send({
         data: posts,
      });
    }
    else {
       res.send('data not found.');
       return 0;  
    }
  }) 

  postRt.get('/genres' , async (req , res) => {
      if ( req.body ) {
         const data = await genreTypes.find({}); 
         res.send({
            data: data
         })
      }
  })

postRt.get('/spec/:id' , async (req , res) => {
   const length = await newsPosts.aggregate([
      {
         $group: {
            _id: req.params['id'], 
            count: { $sum: { $size: "$comments"}}, 
         }
      }
   ]);

   const data = await newsPosts.findOne({_id: req.params['id']}).populate("author").populate({path: 'comments' , populate: {
    path: 'author',
   }}).populate({path: 'comments' , populate: {
   path: 'reply', 
   }});   
   
   if ( data ) {
     res.send({data: data , len: length}); 
   } 
   else {
      res.send('Not found.'); 
      return 0; 
   }
})

postRt.get('/news/spec' , async (req , res) => {
    const data = await newsPosts.aggregate([{$sample: {size: 3}}]);
    res.send({
       result: data
    })
}); 

postRt.post('/addCmt/:id' , async (req , res) => {
    const comment = new cmts(req.body);  
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
        return cmts.findById({_id: req.params['repId']}).populate('author').populate({path: 'reply' , populate: {
           path: 'author'
        }}).lean(); 
    }).then((comment) => {
       res.send({data: comment});
    }).catch((err) => console.log(err)); 
}); 

postRt.post('/addCmt/:id/addReply/:repId/replies', async (req, res) => { 
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
   const { title, descrip, txt , postImg, userId , comments , type , genre } = req.body;
   let genres; 

   await genreTypes.find({}).then((data) => {
       genres = data;  
   })  

   await newsPosts.find({}).limit(1).then(async(data) => {
      if ( Object.keys(data).length === 0) {
        await newsPosts.create({
          title: title,
          descrip: descrip,
          txt: txt,
          postImg: postImg,
          author: userId,
          comments: comments, 
          type: type, 
          genre: genre,  
         }).then(() => {
          res.send({
            message: "News added!",
            });
         });
      }
      else {
        if (Object.keys(data).length !== 0) {   
          await newsPosts.create({
           title: title,
           descrip: descrip,
           txt: txt,
           postImg: postImg,
           author: userId,
           comments: comments, 
           type: type, 
           genre: genre,  
          }).then(async() => {
           if ( genres[0].genres.includes(genre)) {
              return false;
           }
           else {
              await genreTypes.findByIdAndUpdate({_id: '63a039d9b2152245f5cfbca8'} , {$push: {genres: genre}}); 
           }
           await res.send({
             message: "Post added",
             });
          });
       }
     }
   }); 
  });

  postRt.delete('/spec/:id/delCmt/:delId' , async(req , res) => {
       await cmts.findByIdAndDelete({_id: req.params['delId']}).then(async() => {
           await newsPosts.findByIdAndUpdate({_id: req.params['id']} , {$pullAll: {comments: [{_id: req.params['delId']}]}}).then((rs) => console.log(rs) , res.send('Deleted!')).catch((err) => console.log(err)); 
       })
  });  

  postRt.get('/specUser/:id' , async(req , res) => {
      const data = await newsPosts.find({author: req.params['id']}).sort({_id: -1}).populate('author'); 
      res.send({
         result: data
      }); 
  }); 

module.exports = postRt; 