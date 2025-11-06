jest.mock('mysql2/promise', () => ({
  createConnection: jest.fn().mockResolvedValue({
    execute: jest.fn((query, params) => {
      if (query.includes('SELECT * FROM users WHERE id = ?')) {
        return Promise.resolve([[{ id: params[0], name: 'Usuário Teste', email: 'teste@exemplo.com', phone: '123' }]]);
      }
      if (query.includes('SELECT * FROM users')) {
        return Promise.resolve([[{ id: 1, name: 'Maria', email: 'maria@a.com', phone: '111' }]]);
      }
      if (query.includes('INSERT INTO users')) {
        return Promise.resolve([{ insertId: 10 }]);
      }
      if (query.includes('UPDATE users')) {
        return Promise.resolve([]);
      }
      if (query.includes('DELETE FROM users')) {
        return Promise.resolve([]);
      }
      return Promise.resolve([[]]);
    }),
    end: jest.fn().mockResolvedValue(),
  }),
}));

const userModel = require('../src/models/userModel');

describe('🧩 UserModel', () => {
  test('getAllUsers deve retornar lista de usuários', async () => {
    const users = await userModel.getAllUsers();
    expect(users).toEqual([{ id: 1, name: 'Maria', email: 'maria@a.com', phone: '111' }]);
  });

  test('getUserById deve retornar usuário pelo ID', async () => {
    const user = await userModel.getUserById(5);
    expect(user).toEqual({ id: 5, name: 'Usuário Teste', email: 'teste@exemplo.com', phone: '123' });
  });

  test('createUser deve criar e retornar novo usuário', async () => {
    const novo = await userModel.createUser({ name: 'Novo', email: 'novo@a.com', phone: '555' });
    expect(novo).toEqual({ id: 10, name: 'Novo', email: 'novo@a.com', phone: '555' });
  });

  test('updateUser deve atualizar e retornar dados atualizados', async () => {
    const atualizado = await userModel.updateUser(1, { name: 'Atualizado', email: 'att@a.com', phone: '999' });
    expect(atualizado).toEqual({ id: 1, name: 'Atualizado', email: 'att@a.com', phone: '999' });
  });

  test('deleteUser deve deletar sem erro', async () => {
    await expect(userModel.deleteUser(1)).resolves.not.toThrow();
  });
});
