const express = require('express');

const { Post, User, Hashtag ,Comment} = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('comment/:id/comment', isLoggedIn, async (req, res, next) => {
    try {
        const co = await Post.findAll({
            include: {
              model: Post,
              attributes: ['id'],
            },
          });
          res.render('main', {
            title: 'NodeBird',
            com: co,
            
          });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
module.exports = router;