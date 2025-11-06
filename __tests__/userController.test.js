const userModel = require('../src/models/userModel');
const userController = require('../src/controllers/userController');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
});

test('Deve retornar 404 se usuário não for encontrado', async () => {
  const req = { params: { id: 99 } };
  const res = mockRes();

  userModel.getUserById = jest.fn().mockResolvedValue(null);

  await userController.getUserById(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado.' });
});

test('Deve retornar erro 500 ao buscar usuário por ID', async () => {
  const req = { params: { id: 1 } };
  const res = mockRes();

  userModel.getUserById = jest.fn().mockRejectedValue(new Error('Falha no banco'));

  await userController.getUserById(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: 'Falha no banco' });
});

test('Deve retornar erro 500 ao criar usuário', async () => {
  const req = { body: { name: 'Maria' } };
  const res = mockRes();

  userModel.createUser = jest.fn().mockRejectedValue(new Error('Erro ao criar'));

  await userController.createUser(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar' });
});

test('Deve retornar erro 500 ao atualizar usuário', async () => {
  const req = { params: { id: 1 }, body: { name: 'Atualizado' } };
  const res = mockRes();

  userModel.updateUser = jest.fn().mockRejectedValue(new Error('Erro ao atualizar'));

  await userController.updateUser(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao atualizar' });
});

test('Deve retornar erro 500 ao deletar usuário', async () => {
  const req = { params: { id: 1 } };
  const res = mockRes();

  userModel.deleteUser = jest.fn().mockRejectedValue(new Error('Erro ao deletar'));

  await userController.deleteUser(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao deletar' });
});