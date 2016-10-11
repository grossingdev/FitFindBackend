import fs from 'fs';

function getServices() {
  return fs.readdirSync(__dirname);
}

function loadServices(app) {
  getServices(app).forEach(service => {
    if (/^[a-z0-9-]+$/i.test(service)) {
      app.configure(require(`${__dirname}/${service}`).default);
    }
  });
}

export default function () {
  const app = this;
  loadServices(app);
}
