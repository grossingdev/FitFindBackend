import mailgunService from 'feathers-mailgun';

export default function init() {
  const app = this;
  app.use('/mailer', mailgunService({
    apiKey: app.get('mailgun').apiKey,
    domain: app.get('mailgun').domain,
  }));
}
