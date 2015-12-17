export default function isEqual(string, comparison) {
  if (string == comparison) {
    return true;
  } else {
    return errorObj = { 'message': 'is_equal', 'validator': 'isEqual', 'replace': comparison };
  }
}
