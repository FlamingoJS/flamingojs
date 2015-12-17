export default function isset(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'brunoofq@gmail.com') {
        reject({ 'message': 'isset_email', 'validator': 'isset' });
      } else {
        resolve(true);
      }
    }, 1000);
  });
}
