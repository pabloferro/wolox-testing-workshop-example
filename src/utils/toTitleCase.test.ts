import toTitleCase from './toTitleCase';

test('it transforms a sentece to title case', () => {
  const title = toTitleCase('pablo ezeQUIEL Ferro');
  expect(title).toBe('Pablo Ezequiel Ferro');
});
