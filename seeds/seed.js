const sequelize = require('../config/connection');
const { User,Post } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'john_doe@example.com',
    password: 'password123'
  }
];

const postData= [{
  title:"aaa",
  content:"bbb",
  user_id:"1"
}]

async function runseed() {
  await sequelize.sync({force:true});
  await User.bulkCreate(userData);
  await Post.bulkCreate(postData);
}

runseed();
