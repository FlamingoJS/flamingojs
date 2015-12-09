export default function isRequired(string) {
  try {
    return string.length !== 0;
  } catch (e) {
    return false;
  }
}
