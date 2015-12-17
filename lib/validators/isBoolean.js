const errorObj = { 'message': 'is_boolean', 'validator': 'isBoolean' };

export default function isBoolean(value) {
  if (typeof value === 'boolean') {
    return true;
  } else {
    return errorObj;
  }
}
