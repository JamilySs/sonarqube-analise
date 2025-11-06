const userService = require('./userService');

// src/services/userService.js

// Simulando uma lista em memória
let users = [
  { id: 1, name: 'Maria' },
  { id: 2, name: 'João' },
];

// Retorna todos os usuários
function getAllUsers() {
  return users;
}

// Adiciona um novo usuário
function addUser(user) {
  users.push(user);
  return user;
}

module.exports = {
  getAllUsers,
  addUser,
};
