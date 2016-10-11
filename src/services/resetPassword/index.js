import service from 'feathers-mongoose';
import model from './model';
import { before, after } from './hooks';

export default function init() {
  const app = this;
  app.use('/resetPassword', service({
    Model: model,
    lean: true,
  }));
  app.service('resetPassword').before(before).after(after);
}
