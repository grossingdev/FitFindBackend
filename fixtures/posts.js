import app from '../src';
const faker = require('faker');
const CONSTANT = require('./constants');
const { POSTS_COUNT } = CONSTANT;
import { getRandomId, getRandomImages } from './util';

module.exports = () => {
  const promises = [];
  for (let i = 0; i < POSTS_COUNT; i++) {
    promises.push(getRandomId('users')
    .then(userId => {
      const postSchema = {
        images: getRandomImages(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(faker.random.number({ min: 1, max: 3 })),
        visibility: Math.random() < 0.5 ? 'all' : 'followers',
        expiresAt: Math.random() < 0.5 ? faker.date.future(0.2) : null,
        createdBy: userId[0]._id,
        createdAt: faker.date.recent(5),
        updatedAt: faker.date.recent(3),
      };
      return app.service('posts').create(postSchema);
    })
    .catch(error => console.log('post error', error)));
  }
  return Promise.all(promises);
};
