const faker = require('faker');

module.exports = {
  USERS_COUNT: 50,
  POSTS_COUNT: 100,
  COMMENTS_COUNT: 200,
  MESSAGE_COUNT: faker.random.number({ min: 2, max: 35 }),
  THREAD_COUNT: 10,
  VOTE_COUNT: 10,
};
