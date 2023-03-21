const router = require('express').Router();
const sequelize = require('../config/connection');
const {User,Post,Comment} = require('../models');
const { withAuth } = require("../utils/withAuth") 

router.get('/',async (req,res) => {
    const postData = await Post.findAll();
    const posts =postData.map(post => post.get({ plain: true}));

    res.render("home",{posts,
                
    });
});

module.exports = router;