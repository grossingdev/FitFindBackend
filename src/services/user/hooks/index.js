import { disable, remove } from 'feathers-hooks';
import auth from 'feathers-authentication';
import updateUpdatedAt from '../../../hooks/updateUpdatedAt';
import createUserFromSocial from './createUserFromSocial';
export const before = {
  all: [
  ],
  find: [],
  get: [
  ],
  create: [
    createUserFromSocial(),
    auth.hooks.hashPassword(),
  ],
  update: [
    auth.hooks.verifyToken(),
    auth.hooks.hashPassword(),
    updateUpdatedAt(),
  ],
  patch: [
    auth.hooks.verifyToken(),
    auth.hooks.hashPassword(),
    updateUpdatedAt(),
  ],
  remove: [
    disable(),
  ],
};

export const after = {
  all: [
    remove('password'),
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [],
};
