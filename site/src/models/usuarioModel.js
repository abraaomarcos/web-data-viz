var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function ObterPersonagens(){

    var queryPersonagem = `
    SELECT * FROM personagem;`;
    return database.executar(queryPersonagem);

}

async function salvarPersonagem(idUsuario, nomePersonagem){
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var queryPersonagem = `
        SELECT idPersonagem FROM personagem WHERE nomePersonagem = '${nomePersonagem}';
    `;
    var idPersonalidade = await database.executar(queryPersonagem);

    var instrucao =  `
    INSERT INTO personagem (nomePersonagem, fkUsuario, fkPersonalidade)
    VALUES ('${nomePersonagem}', '${idUsuario}', '${idPersonalidade[0].idPersonagem}');`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}


module.exports = {
    autenticar,
    cadastrar,
    salvarPersonagem,
    ObterPersonagens
};