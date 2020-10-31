export default {
  promiseAPI(action, params = null) {
    return new Promise((resolve) => {
      action({
        resolve,
        params,
      });
    });
  },
};
