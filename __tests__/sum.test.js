function sum(a, b) {
  return a + b;
}

test('soma de 2 + 3 é igual a 5', () => {
  expect(sum(2, 3)).toBe(5);
});
