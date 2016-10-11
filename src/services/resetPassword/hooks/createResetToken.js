import crypto from 'crypto';
import cryptoJS from 'crypto-js';
import sha512 from 'crypto-js/sha512';

export default function () {
  return function checkResetToken(hook) {
    const q = {};
    const promises = [];
    if (hook.data.username) {
      q.username = hook.data.username;
    } else if (hook.data.email) {
      q.email = hook.data.email;
    } else {
      throw new Error('Invalid user data.');
    }
    promises.push(
      hook.app.service('users').find({ query: q }).then(
        (user) => {
          const salt = crypto.randomBytes(48).toString('base64');
          let hash = sha512(salt + user[0].email);
          hash = hash.toString(cryptoJS.enc.Base64);

          hook.data.userId = user[0]._id;
          hook.data.email = user[0].email;
          hook.data.token = hash;
        }
      )
    );
    return Promise.all(promises).then(() => hook);
  };
}
