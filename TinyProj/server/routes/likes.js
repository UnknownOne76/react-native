const exp = require('express'); 
const cmts = require('../models/Comments') , likesRt = exp.Router();

likesRt.put('/addLike/:cmtId' , async(req , res) => {
    const { userId } = await req.body;
    let likes , dislikes;  
    await cmts.findByIdAndUpdate({_id: req.params['cmtId']}).then((res) => {
        likes = res.likes;
        dislikes = res.disLikes;  
    });
    
    if (!likes.includes(userId) && !dislikes.includes(userId)) { 
     await cmts.findByIdAndUpdate({_id: req.params['cmtId']} , {$push: {likes: userId}}).then(async() => {
        await cmts.findByIdAndUpdate({_id: req.params['cmtId']} , {$inc: {likeCnt: 1}}); 
     });

     res.send('Liked!'); 
    }
    else {
       if (dislikes.includes(userId)) {
        await cmts.findByIdAndUpdate({_id: req.params['cmtId']} , {$pull: {disLikes: userId} , $push: {likes: userId}}).then(async() => {
            await cmts.findByIdAndUpdate({_id: req.params['cmtId']} , {$inc: {disCnt: -1 , likeCnt: 1}}); 
        }); 
       }
       else {
        res.send('Liked before!');     
       }
    } 
});

likesRt.put('/disLike/:cmtId' , async(req , res) => {
    const { userId } = await req.body; 
    let likes , dislikes;
    await cmts.findByIdAndUpdate({_id: req.params['cmtId']}).then((res) => {
        likes = res.likes; 
        dislikes = res.disLikes; 
    })
    if ( !dislikes.includes(userId) && !likes.includes(userId)) {
        await cmts.findByIdAndUpdate({_id: req.params['cmtId']} , {$push: {disLikes: userId}}).then(async() => {
             await cmts.findByIdAndUpdate({_id: req.params['cmtId']} , {$inc: {disCnt: 1}}); 
        })
        res.send('Disliked!'); 
    }
    else {
        if (likes.includes(userId)) {
            await cmts.findByIdAndUpdate({_id: req.params['cmtId']} , {$pull: {likes: userId} , $push: {disLikes: userId}}).then(async() => {
                await cmts.findByIdAndUpdate({_id: req.params['cmtId']} , {$inc: {likeCnt: -1 , disCnt: 1}}); 
            }); 
        }
        else {
            res.send('Already disliked!'); 
        }
    }; 
}); 

module.exports = likesRt; 
