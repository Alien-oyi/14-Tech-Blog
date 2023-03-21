const router = require('express').Router();
const sequelize = require('../config/connection');
const {User,Post,Comment} = require('../models');

router.get('/',async (req,res) => {
    const postData = await Post.findAll();
    const posts =postData.map(post => post.get({ plain: true}))
})

module.exports = router;