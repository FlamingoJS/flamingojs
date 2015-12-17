function verifyMaxLength(string, maxLenght) {
  if (string.length < maxLenght) {
    return true;
  } else {
    return { 'message': 'is_max', 'validator': 'isLength|verifyMaxLength', 'replace': maxLenght };
  }
}

function verifyMinLength(string, minLength) {
  if (string.length > minLength) {
    return true;
  } else {
    return { 'message': 'is_min', 'validator': 'isLength|verifyMinLength', 'replace': minLength };
  }
}

export default function isLength(string, options) {
  let isCorrect = true;

  if (options.hasOwnProperty('min')) {
    isCorrect = verifyMinLength(string, options.min);
  }

  if (options.hasOwnProperty('max') && isCorrect === true) {
    isCorrect = verifyMaxLength(string, options.max);
  }

  return isCorrect;
}
