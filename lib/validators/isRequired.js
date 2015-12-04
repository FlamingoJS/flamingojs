export default function verifyLenght(string) {
  try {
    return string.length !== 0;
  } catch (e) {
    return false;
  }
}
