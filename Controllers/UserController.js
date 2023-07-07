const express = require("express");
const fs = require("fs");
const dados = require("../dados.json");

function validarInstrutor(conta) {}

function searchAllAccounts(req, res) {
  res.json(dados);
}

function searchOneAccounts(req, res) {
  const conta = dados.find(
    (conta) => conta.email === req.params.emailProcurado
  );

  if (conta === undefined) {
    res.status(404);
    res.json({
      erro: "Conta " + req.params.emailProcurado + " não existe",
    });
    return;
  }

  res.json(conta);
}

function addNewAccount(req, res) {
  const conta = dados.find((conta) => {
    return conta.email === req.body.email;
  });

  console.log(conta);

  if (conta) {
    return res.status(400).json({ message: "Essa conta já existe" });
  }

  const novaConta = {
    email: req.body.email,
    password: req.body.password,
  };

  dados.push(novaConta);

  let novoDados = JSON.stringify(dados);

  fs.writeFileSync("dados.json", novoDados);

  res.json({
    message: "Sua conta foi criada com sucesso",
    status: "OK",
  });
}

function editAccount(req, res) {
  const conta = dados.find(
    (conta) => conta.email === req.params.emailProcurado
  );

  if (conta === undefined) {
    res.status(404);
    res.json({
      erro: "Conta " + req.params.emailProcurado + " não existe",
    });
    return;
  }

  // const erro = validarInstrutor({
  //   nome: req.body.nome ?? aluno.nome,
  //   idade: req.body.idade ?? aluno.idade,
  //   moduloAtual: req.body.moduloAtual ?? aluno.moduloAtual,
  //   numeroTurma: req.body.numeroTurma ?? aluno.numeroTurma,
  // });

  // if (erro) {
  //   res.status(400);
  //   res.json({ erro });
  //   return;
  // }

  if (req.body.password !== undefined) {
    conta.password = req.body.password;
  }

  let novoDados = JSON.stringify(dados);

  fs.writeFileSync("dados.json", novoDados);

  res.json({ message: "Senha alterada com sucesso", status: "OK" });
}

function deleteAccount(req, res) {
  const conta = dados.find(
    (conta) => conta.email === req.params.emailProcurado
  );

  if (!conta) {
    res.status(404);
    res.json({
      erro: "Conta " + req.params.emailProcurado + " não existe",
    });
    return;
  }

  const indice = dados.indexOf(conta);

  dados.splice(indice, 1);

  let novoDados = JSON.stringify(dados);

  fs.writeFileSync("dados.json", novoDados);

  res.json(conta);
}

function login(req, res) {
  const conta = dados.find((conta) => {
    return conta.email === req.body.email;
  });

  if (conta.password !== req.body.password) {
    return res.status(400).json({ message: "Senha errada", status: "error" });
  }

  return res.status(200).json({ message: "Logado com sucesso", status: "OK" });
}

module.exports = {
  searchAllAccounts,
  searchOneAccounts,
  addNewAccount,
  editAccount,
  deleteAccount,
  login,
};
