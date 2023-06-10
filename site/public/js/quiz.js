function submitQuiz() {
 
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

    var idUsuario = sessionStorage.getItem("ID_USUARIO");

    fetch("/usuarios/salvarPersonalidade", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idUsuarioServer :  idUsuario,
        nomePersonagemServer :  nomePersonagem
      })
  }).then(function (resposta) {

    if (resposta.ok) {
    
      window.location.href = "./quiz.html#result"
      result.innerHTML = `Parabéns ${sessionStorage.getItem("NOME_USUARIO")}, você é o/a ${nomePersonagem}!<br>`;
      result.innerHTML += `Conheça mais sobre os <a href="./logado.html#listaPersonagens" style="text-decoration: none; color: #ffff; background-color: aqua; border-radius: 10px;">personagens</a>`

    } else {
        throw ("Houve um erro ao tentar obter o resultado do quiz!");
    }
  }).catch(function (resposta) {
      console.log(`#ERRO ao salvar personalidade: ${resposta}`);
      return;
  });

  buildChart()
}
}

function buildChart() {

  var personagens = JSON.parse(sessionStorage.getItem("PERSONAGENS"));
  
  var yValues = [];
  var xValues = [];
  var narutoCount = 0;
  var gaaraCount = 0;
  var sasukeCount = 0;
  var sakuraCount = 0;
  var rockLeeCount = 0;
  var hinataCount = 0;
  var nejiCount = 0;
  var tsunadeCount = 0;
  var jirayaCount = 0;
  var kakashiCount = 0;


  personagens.forEach(element => {

    if(element.nomePersonagem == "Naruto"){
      narutoCount++
      if (xValues.indexOf("Naruto") == -1)
      {
        xValues.push("Naruto")
      }
    }

    if(element.nomePersonagem == "Gaara"){
      gaaraCount++
      if (xValues.indexOf("Gaara") == -1)
      {
        xValues.push("Gaara")
      }
    }
    if(element.nomePersonagem == "Sasuke"){
      sasukeCount++
      if (xValues.indexOf("Sasuke") == -1)
      {
        xValues.push("Sasuke")
      }
    }
    if(element.nomePersonagem == "Sakura"){
      sakuraCount++
      if (xValues.indexOf("Sakura") == -1)
      {
        xValues.push("Sakura")
      }
    }
    if(element.nomePersonagem == "Rock Lee"){
      rockLeeCount++
      if (xValues.indexOf("Rock Lee") == -1)
      {
        xValues.push("Rock Lee")
      }
     
    }
    if(element.nomePersonagem == "Hinata"){
      hinataCount++
      if (xValues.indexOf("Hinata") == -1)
      {
        xValues.push("Hinata")
      }
    }
    if(element.nomePersonagem == "Neji"){
      nejiCount++
      if (xValues.indexOf("Neji") == -1)
      {
        xValues.push("Neji")
      }
    }
    if(element.nomePersonagem == "Tsunade"){
      tsunadeCount++
      if (xValues.indexOf("Tsunade") == -1)
      {
        xValues.push("Tsunade")
      }
    }
    if(element.nomePersonagem == "Jiraya"){
      jirayaCount++
      if (xValues.indexOf("Jiraya") == -1)
      {
        xValues.push("Jiraya")
      }
     
    }
    if(element.nomePersonagem == "Kakashi"){
      kakashiCount++
      if (xValues.indexOf("Kakashi") == -1)
      {
        xValues.push("Kakashi")
      }
      
    }
    
  });

  yValues.push(narutoCount);
  yValues.push(gaaraCount);
  yValues.push(sasukeCount);
  yValues.push(sakuraCount);
  yValues.push(rockLeeCount);
  yValues.push(hinataCount);
  yValues.push(nejiCount);
  yValues.push(tsunadeCount);
  yValues.push(jirayaCount);
  yValues.push(kakashiCount);

  var barColors = ["red", "green","blue","aqua","brown","yellow", "purple","black","pink","cyan"];
  
  new Chart("graficoPersonagem", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "Personagens e Usuários"
      }
    }
  });
}
