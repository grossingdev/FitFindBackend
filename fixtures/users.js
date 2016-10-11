import app from '../src';
const faker = require('faker');
const CONSTANT = require('./constants');
const { USERS_COUNT } = CONSTANT;

module.exports = () => {
  const promises = [];
  for (let i = 0; i < USERS_COUNT; i++) {
    const userOptions = {
      username: faker.internet.userName(),
      password: 'abcd1234',
      email: faker.internet.email(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      avatarUrl: faker.image.avatar(),
      yearOfBirth: faker.random.number({ min: 1960, max: 2010 }),
      gender: Math.random() <= 0.5 ? 'male' : 'female',
      bio: faker.lorem.sentence(),
      location: {
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        city: faker.address.city(),
        country: faker.address.country(),
        state: faker.address.stateAbbr(),
      },
      createdAt: faker.date.past(2),
    };
    promises.push(app.service('users').create(userOptions)
    .catch((error) => console.log('user error', error)));
  }
  return Promise.all(promises);
};
