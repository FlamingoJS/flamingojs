const errorObj = { 'message': 'is_integer', 'validator': 'isInteger' };

export default function isInteger(string) {
  const pattern = /^\-?[0-9]+$/g;

  if (pattern.test(string)) {
    return true;
  } else {
    return errorObj;
  }
}
