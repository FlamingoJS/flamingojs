function verifyMaxLength(string, maxLenght) {
  return string.length <= maxLenght;
}

function verifyMinLength(string, minLength) {
  return string.length >= minLength;
}

export default function isLength(string, options) {
  var isCorrect = true;

  if (options.hasOwnProperty('min')) {
    isCorrect = verifyMinLength(string, options.min);
  }

  if (options.hasOwnProperty('max') && isCorrect) {
    isCorrect = verifyMaxLength(string, options.max);
  }

  return isCorrect;
}
