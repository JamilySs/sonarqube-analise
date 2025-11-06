jest.mock('../src/models/userModel', () => ({
  getAllUsers: jest.fn(),
}));

const userModel = require('../src/models/userModel');
const app = require('../src/app');
const request = require('supertest');

describe('🚀 App', () => {
  beforeEach(() => jest.clearAllMocks());

  test('Deve retornar lista de usuários na rota /api/users', async () => {
    userModel.getAllUsers.mockResolvedValue([{ id: 1, name: 'Teste' }]);
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: 'Teste' }]);
  });

  test('Deve retornar 500 se ocorrer erro no banco de dados', async () => {
    userModel.getAllUsers.mockRejectedValue(new Error('Falha no banco'));
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Falha no banco' });
  });
});
