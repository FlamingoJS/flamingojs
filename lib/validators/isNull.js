const errorObj = { 'message': 'is_null', 'validator': 'isNull' };

export default function isNull(string) {
  if (string === null) {
    return true;
  } else {
    return errorObj;
  }
}
