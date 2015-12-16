export default class Runner {
  constructor(validators) {
    return Promise.all(validators.map((validator) => {
      return validator.run();
    })).then(() => {
      return true;
    })
    .catch((error) => {
      return error;
    });
  }
}
