import app from '../src';
const faker = require('faker');
const CONSTANT = require('./constants');
import { getRandomId } from './util';
const { COMMENTS_COUNT } = CONSTANT;

exports.generateComments1 = () => {
  const promises = [];
  for (let i = 0; i < COMMENTS_COUNT * 3 / 4; i++) {
    let randomUserId;
    promises.push(getRandomId('users')
    .then(userId => {
      randomUserId = userId[0]._id;
      return getRandomId('posts');
    })
    .then(postId => {
      const commentSchema = {
        targetId: postId[0]._id,
        target: 'post',
        comment: faker.lorem.paragraph(faker.random.number({ min: 1, max: 4 })),
        updatedAt: faker.date.recent(2),
        createdAt: faker.date.recent(4),
        createdBy: randomUserId,
      };
      return app.service('comments').create(commentSchema);
    })
    .catch(error => console.log('comment 1 error', error)));
  }
  return Promise.all(promises);
};

exports.generateComments2 = () => {
  const promises = [];
  for (let i = 0; i < COMMENTS_COUNT / 4; i++) {
    let randomUserId;
    promises.push(getRandomId('users')
    .then(userId => {
      randomUserId = userId[0]._id;
      return getRandomId('comments');
    })
    .then(commentId => {
      const commentSchema = {
        targetId: commentId[0]._id,
        target: 'comment',
        comment: faker.lorem.paragraph(faker.random.number({ min: 1, max: 4 })),
        updatedAt: faker.date.recent(2),
        createdAt: faker.date.recent(4),
        createdBy: randomUserId,
      };
      return app.service('comments').create(commentSchema);
    })
    .catch(error => console.log('comment 2 error', error)));
  }
  return Promise.all(promises);
};
