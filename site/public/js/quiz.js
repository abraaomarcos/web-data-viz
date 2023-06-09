function submitQuiz() {
  console.log("Log");
  var result = document.getElementById("result");
  var answers = document.getElementsByTagName("select");
  var characterCount = {
    garra: 0,
    esforco: 0,
    foco: 0,
    inteligencia: 0,
    raciocinio: 0,
    apaixonada: 0,
    responsabilidade: 0,
    moderacao: 0,
    generosidade: 0,
    autoestima: 0
  };

  for (var i = 0; i < answers.length; i++) {
    var selectedValue = answers[i].value;
    if (selectedValue !== "") {
      characterCount[selectedValue]++;
    }
  }

  var maxCount = 0;
  var maxCharacter = "";

  for (var character in characterCount) {
    if (characterCount[character] > maxCount) {
      maxCount = characterCount[character];
      maxCharacter = character;
    }
  }

  if (maxCharacter === "") {
    result.textContent = "Por favor, responda a todas as perguntas.";
    return
  } else {
    var nomePersonagem = "";

    switch (maxCharacter) {
      case "garra":
        nomePersonagem = "Naruto";
        break;
      case "esforco":
        nomePersonagem = "Rock Lee";
        break;
      case "foco":
        nomePersonagem = "Neji";
        break;
      case "inteligencia":
        nomePersonagem = "Sakura";
        break;
      case "raciocinio":
        nomePersonagem = "Sasuke";
        break;
      case "apaixonada":
        nomePersonagem = "Hinata";
        break;
      case "responsabilidade":
        nomePersonagem = "Tsunade";
        break;
      case "moderacao":
        nomePersonagem = "Jiraya";
        break;
      case "generosidade":
        nomePersonagem = "Gaara";
        break;
      case "autoestima":
        nomePersonagem = "Neji";
        break;
    }

    fetch("/usuarios/salvarPersonalidade", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          // crie um atributo que recebe o valor recuperado aqui
          // Agora vá para o arquivo routes/usuario.js
         idUsuarioServer :  sessionStorage.getItem("ID_USUARIO"),
         nomePersonagemServer :  nomePersonagem
      })
  }).then(function (resposta) {

      console.log("resposta: ", resposta);

      if (resposta.ok) {
      
        console.log("batatinha personagem:", nomePersonagem);
        window.location.href = "./quiz.html#result"
        result.innerHTML = `Parabéns ${sessionStorage.getItem("NOME_USUARIO")}, você é o/a ${nomePersonagem}!<br>`;
        result.innerHTML += `Conheça mais sobre os <a href="./logado.html#listaPersonagens" style="text-decoration: none; color: #ffff; background-color: aqua; border-radius: 10px;">personagens</a>`

      } else {
          throw ("Houve um erro ao tentar obter o resultado do quiz!");
      }
  }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      return;
  });

}
}
