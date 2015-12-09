export default function iterate(items, callback) {
  Array.prototype.forEach.call(items, (element) => {
    callback(element);
  });
};
