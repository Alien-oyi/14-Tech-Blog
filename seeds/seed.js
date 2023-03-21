const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'john_doe@example.com',
    password: 'password123'
  }
];

async function runseed() {
  await sequelize.sync({force:true});
  await User.bulkCreate(userData,{
    individualHooks:true
  });
}

runseed();
