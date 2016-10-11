export default function () {
  return function updateUpdatedAt(hook) {
    hook.data.updatedAt = new Date();
    return hook;
  };
}
