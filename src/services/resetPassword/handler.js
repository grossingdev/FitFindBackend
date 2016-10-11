export default function init() {
  const app = this;
  app.get('/confirmReset', (req, res, next) => {
    if (req.query.token) {
      const token = /token=(.*)/g.exec(req.url)[1];
      res.render('resetPassword', { token });
    } else {
      next();
    }
  });

  app.post('/confirmReset', (req, res) => {
    let token = '';
    if (req.body.token) {
      token = req.body.token;
    } else {
      throw new Error('No token provided.');
    }
    return app.service('resetPassword').find({ query: { token } }).then(
      (m) => Promise.all([
        app.service('users').patch(m[0].userId, { password: req.body.password }),
        app.service('resetPassword').remove(m[0]._id),
      ])
    )
    .then(
      () => res.render('resetSuccess')
    )
    .catch(err => console.log(err));
  });
}
