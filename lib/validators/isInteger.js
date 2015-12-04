export default function isInteger(string) {
  const pattern = /^\-?[0-9]+$/g;

  return pattern.test(string);
}
