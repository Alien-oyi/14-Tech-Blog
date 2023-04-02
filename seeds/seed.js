const sequelize = require('../config/connection');
const { User,Post } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'john_doe@example.com',
    password: 'password123'
  },
  {
    username: 'Alien_boi',
    email: 'daijinmin78@gmail.com',
    password: 'Aassas123'
  }
];

const postData= [{
  id:1,
  title:"Eve Starts Selling Matter-Enabled Smart Home Devices",
  content:"Eve Systems today announced the launch of its updated Matter-enabled Eve Energy smart plug, which is its first out-of-the-box Matter-compatible device. Eve previously released a beta firmware update to add Matter to some existing Eve accessories, but as of today, it is possible to buy the Eve Energy with Matter integration.",
  user_id:1},{
    id:2,
    title:"Siri Can Start a Screen Recording in iOS 16.5 Beta 1",
    content:"With the iOS 16.5 beta, Apple is working to improve Siri's functionality, and there is a new option to start a screen recording with the voice assistant. As noted by 9to5Mac, you can now say 'Hey ‌Siri‌, start a screen recording' to use the Screen Record feature.",
    user_id:2
  }]

async function runseed() {
  await sequelize.sync({force:true});
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Post.bulkCreate(postData);
  console.log('\n----- POST SEEDED -----\n');

  process.exit(0);
}

runseed();
