const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'john_doe@example.com',
    password: 'password123'
  },
  {
    username: 'jane_doe',
    email: 'jane_doe@example.com',
    password: 'password456'
  },
  {
    username: 'bob_smith',
    email: 'bob_smith@example.com',
    password: 'password789'
  }
];

const postData = [
  {
    title: 'My first post',
    body: 'This is my first post on this blog.',
    user_id: 1
  },
  {
    title: 'My second post',
    body: 'This is my second post on this blog.',
    user_id: 2
  },
  {
    title: 'My third post',
    body: 'This is my third post on this blog.',
    user_id: 1
  }
];

const commentData = [
  {
    comment_text: 'Great post!',
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: 'I agree with your points.',
    user_id: 2,
    post_id: 1
  },
  {
    comment_text: 'Thanks for sharing.',
    user_id: 3,
    post_id: 2
  }
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  const posts = await Post.bulkCreate(postData);

  const comments = await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();