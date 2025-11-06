const userService = require('../src/services/userService');


test('Deve retornar lista de usuários', () => {
  const result = userService.getAllUsers();
  expect(Array.isArray(result)).toBe(true);
});

test('Deve adicionar um novo usuário', () => {
  const user = { id: 1, name: 'Jamily' };
  userService.addUser(user);
  const users = userService.getAllUsers();
  expect(users).toContainEqual(user);
});
