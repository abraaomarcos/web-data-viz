var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});
router.post("/salvarPersonalidade", async function (req, res) {
    usuarioController.salvarPersonagem(req, res);
});

router.get("/obterPersonagens", function (_, res) {
    usuarioController.ObterPersonagens(_, res);
});


module.exports = router;