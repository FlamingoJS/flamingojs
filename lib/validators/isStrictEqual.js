export default function isStrictEqual(string, comparison) {
  if (string === comparison) {
    return true;
  } else {
    return { 'message': 'is_equal', 'validator': 'isStrictEqual', 'replace': comparison };
  }
}
