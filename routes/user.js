const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('success');
      
    } else {
      res.status(404).send('no user');
    }
    
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:id/patch', isLoggedIn, async (req, res, next) => {
  
  try {
    console.log(req.params.id);
      await User.update({
          nick: req.body.nick
      },
      {
          where : { id : req.params.id }  
      });      
      res.send('OK');
  } catch (err) {
    console.error(err);
    next(err);
  }
})


module.exports = router;