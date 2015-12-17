const errorObj = { 'message': 'is_date', 'validator': 'isDate' };

export default function isDate(string) {
  const timestamp = Date.parse(string);
  const pattern = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;

  if (isNaN(timestamp)) {
    return errorObj;
  } else {
    if (pattern.test(string)) {
      return true;
    } else {
      return errorObj;
    }
  }
}
