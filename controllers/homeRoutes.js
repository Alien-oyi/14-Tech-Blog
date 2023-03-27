const router = require('express').Router();
const sequelize = require('../config/connection');
const {User,Post} = require('../models');
const  withAuth  = require("../utils/withAuth") 

router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("home", {
      posts
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;