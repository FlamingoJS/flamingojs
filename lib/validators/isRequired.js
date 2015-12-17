export default function isRequired(string) {
  try {
    if (string.length !== 0) {
      return true;
    } else {
      return { 'message': 'is_required', 'validator': 'isRequired' };
    }
  } catch (e) {
    return { 'message': 'is_required', 'validator': 'isRequired' };
  }z
}
