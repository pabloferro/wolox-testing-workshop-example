export default function toTitleCase(string: string) {
  return (
    string &&
    string
      .split(' ')
      .map(word => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
      .join(' ')
  );
}
