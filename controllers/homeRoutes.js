const {User,Post} = require('../models');
const  withAuth  = require("../utils/withAuth") 

const router = require("express").Router();

router.get('/',withAuth, async (req, res) => {
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

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get("/post/:id", async (req, res) => {
  const posts = await Post.findOne({
    where:{id:req.params.id}
  });
  res.json(posts);
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userblog = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    userblogs = userblog.map((post) => post.get({ plain: true }));
     console.log(userblogs);
      res.render("dash", {
      userblogs,
      loggedIn: req.session.loggedIn,
    });
  } catch(err) {
   console.log(err);
    res.status(500).json(err);
  }
})

router.post("/post", withAuth, async (req, res) => {
  try {
    const dbBlogData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(dbBlogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post', withAuth, async (req, res) => {
 
  res.render("post");

});

//  DELETE (/post/:id)
router.delete('/post/:id',withAuth, async (req, res) => {
  // Finds one post
  const post = await Post.findOne({
    where: {
      id: req.params.id,
    },
  });
  // If no post with that id exists, send 404 page
  if (!post) {
    res.render("404");
    return;
  } else {
    // If user id does not match the session user id, send 404 page
    if (post.user_id !== req.session.user_id) {
      res.render("404");
      return;
    } else {
      // Deletes the post based on its id
      const delPost = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(delPost);
    }
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!post) {
    res.render("404");
    return;
  } else {
    if (post.user_id !== req.session.user_id) {
      res.render("404");
      return;
    } else {
      const editPost = await Post.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(editPost);
    }
  }
});


module.exports = router;