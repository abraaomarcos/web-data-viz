var database = require("../database/config");

function buscarUltimasMedidas(idPersonagem) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT * FROM usuario JOIN personagem ON idUsuario = fkUsuario JOIN personalidade ON idPersonalidade = fkPersonalidade;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT * FROM usuario JOIN personagem ON idUsuario = fkUsuario JOIN personalidade ON idPersonalidade = fkPersonalidade;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas
}
