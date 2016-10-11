import app from '../src';
const faker = require('faker');

const randomId = (length = 16) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const getRandomImages = () => {
  const images = [];
  const maxImages = faker.random.number({ min: 1, max: 4 });
  for (let i = 0; i < maxImages; i++) {
    const image = faker.random.number({ min: 5, max: 30 });
    const dims = 1000;
    const rotate = 0;
    const rotateAdj = 0;
    const scale = 1;
    const scaleAdj = 1;
    const topLeft = -dims * scale * rotate * Math.PI / 180;
    const topLeftAdj = maxImages > 1 ?
      (-dims * scale * (rotate + rotateAdj) * Math.PI / 180) - topLeft : 0;
    images.push({
      id: randomId(),
      title: faker.lorem.sentence(),
      url: `https://unsplash.it/${dims}?image=${image}`,
      height: dims,
      width: dims,
      editState: { top: topLeft, left: topLeft, scale, rotate },
      editStateModified: { top: topLeftAdj, left: topLeftAdj, scale: scaleAdj, rotate: rotateAdj },
    });
  }
  return images;
};

export const getRandomHashtags = (min = 0, max = 5) => {
  const hashTags = [];
  const limit = faker.random.number({ min, max });
  if (limit > 0) {
    for (let i = 0; i < limit; i++) {
      hashTags.push(faker.lorem.word());
    }
  }
  return hashTags;
};

export const getRandomId = (collection) => (
  app.service(collection).find()
  .then(result => {
    const $skip = faker.random.number({ min: 0, max: result.length - 1 });
    return {
      $select: ['_id'],
      $sort: { _id: 1 },
      $limit: 1,
      $skip,
    };
  })
  .then(query => app.service(collection).find({ query }))
);

export const getRandomHandles = (min = 0, max = 3) => {
  const promises = [];
  const limit = faker.random.number({ min, max });
  if (limit > 0) {
    for (let i = 0; i < limit; i++) {
      promises.push(
        getRandomId('users')
        .then(user => ({ usernames: user[0].username, ids: user[0]._id }))
      );
    }
  }
  return Promise.all(promises);
};
