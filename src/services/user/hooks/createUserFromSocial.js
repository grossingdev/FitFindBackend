export default function () {
  return function createUserFromSocial(hook) {
    const { facebook, facebookId } = hook.data;
    console.info('hook', hook.data);
    if (facebook && facebookId) {
      hook.data.email = facebook.email;
      hook.data.name = facebook.name;
      hook.data.password = facebookId;
      hook.data.avatarUrl = facebook.picture.data.url;
    }

    const { linkedin } = hook.data;
    if (linkedin) {
      console.info('hook', JSON.stringify(linkedin));
      hook.data.name = linkedin.formattedName;
      hook.data.email = linkedin.emailAddress;
      hook.data.password = linkedin.formattedName;
      hook.data.avatarUrl = linkedin.pictureUrl;
    }
    return hook;
  };
}
