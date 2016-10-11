const authentication = require('feathers-authentication');
import { Strategy as FacebookStrategy } from 'passport-facebook';
import FacebookTokenStrategy from 'passport-facebook-token';

import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { Strategy as LinkedInTokenStrategy } from 'passport-linkedin-token-oauth2';


export default function () {
  const app = this;
  const config = app.get('auth');
  config.facebook.strategy = FacebookStrategy;
  config.facebook.tokenStrategy = FacebookTokenStrategy;
  config.linkedin.strategy = LinkedInStrategy;
  app.configure(authentication(config));
}
