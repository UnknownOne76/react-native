const exp = require('express');
const User = require('../models/User');
const followRt = exp.Router();

followRt.put('/follow/:id' , async(req ,res) => {
   await User.findById({_id: req.body.userId}).then(async(user) => {
      if (user.following.includes(req.params['id'])) {
        res.send('Already followed');
      }
      else {
         await User.findByIdAndUpdate({_id: req.body.userId}, {$push: {following: req.params['id']}}).then(async() => { 
            await User.findById({_id: req.params['id']}).then(async(user) => {
               if (user.followers.includes(req.body.userId)) {
                  res.send('Alr followed'); 
               }
               else {
                await User.findByIdAndUpdate({_id: req.params['id']} , {$push: {followers: req.body.userId}}).then(() => res.send('Followed!'));
               }
            }) 
         }) 
      }
   });
}); 

followRt.put('/unfollow/:id' , async(req , res) => {
    await User.findById({_id: req.body.userId}).then(async(user) => {
       if ( user.following.includes(req.params['id'])) {
          await User.findByIdAndUpdate({_id: req.body.userId} , {$pull: {following: req.params['id']}}).then(() => res.send('Unfollowed!'));
       }
       else {
          res.send('No user found'); 
       }       
    })
})

module.exports = followRt; 