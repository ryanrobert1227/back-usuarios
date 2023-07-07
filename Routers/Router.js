const express = require("express");
const {
  searchAllAccounts,
  searchOneAccounts,
  addNewAccount,
  editAccount,
  deleteAccount,
  login,
} = require("../Controllers/UserController");

const roteador = express();

roteador.get("/contas", searchAllAccounts);
roteador.get("/contas/:emailProcurado", searchOneAccounts);
roteador.post("/contas", addNewAccount);
roteador.post("/contas/login", login);
roteador.patch("/contas/:emailProcurado", editAccount);
roteador.delete("/contas/:emailProcurado", deleteAccount);

module.exports = roteador;
