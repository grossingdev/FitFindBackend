const generateUsers = require('./users');
const generatePosts = require('./posts');
const generateComments = require('./comments');
const generateMessages = require('./messages');
const generateVotes = require('./votes');

function fixtures() {
  console.log("Started app and running fixtures...");
  return generateUsers()
  .then(() => generatePosts())
  .then(() => generateComments.generateComments1())
  .then(() => generateComments.generateComments2())
  // .then(() => generateMessages())
  // .then(() => generateVotes())
  .then(() => console.log("Fixtures run successfully!") && process.exit())
  .catch(error => console.log(error) && process.exit(1));
}

fixtures();
