function createNotification(hook, notification) {
  return hook.app.service('notifications').create(notification);
}

export default function sendNotification(parseResult) {
  if (typeof parseResult !== 'function') {
    throw new Error('parseResult should be a function');
  }
  return function notification(hook) {
    const parsedResult = parseResult(hook.result);
    if (Array.isArray(parsedResult)) {
      parsedResult.forEach(createNotification.bind(null, hook));
    } else {
      createNotification(hook, parsedResult);
    }
  };
}
