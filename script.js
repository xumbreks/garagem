function adicionarColuna(numero = "") {
  
  // Cria uma nova coluna
  var coluna = document.createElement("div");
  coluna.classList.add("coluna", "flex",
    "justify-center", "items-center", "space-x-2");

  // Cria um campo de entrada para adicionar números
  var input = document.createElement("input");
  input.type = "number";
  input.classList.add("border", "border-gray-500", "p-2", "bg-transparent", "mt-2");
  // Adiciona o atributo inputmode
  input.setAttribute("inputmode", "numeric"); 
  // Adiciona o evento de mudança de valor ao campo de entrada
  input.addEventListener("change", function () {
    salvarNumeroNoLocalStorage(input.value);
  });
  // Define o valor do número se fornecido
  input.value = numero;

  coluna.appendChild(input);

  // Adiciona o ícone ao lado da coluna
  var icon = document.createElement("i");
  icon.classList.add("ph", "ph-check-circle", "mt-2", "text-4xl", "text-white");
  icon.addEventListener("click", function () {
    mudarCor(icon);
  });
  coluna.appendChild(icon);

  // Adiciona o ícone ao lado da coluna
  var icon2 = document.createElement("i");
  icon2.classList.add("ph", "ph-check-circle", "mt-2", "text-4xl", "text-white");
  icon2.addEventListener("click", function () {
    mudarCor(icon2);
  });
  coluna.appendChild(icon2);

  // Adiciona a coluna ao contêiner
  var container = document.getElementById("container");
  container.appendChild(coluna);
};


function removerColuna() {
  // Obtém todas as colunas presentes no contêiner
  var colunas = document.getElementsByClassName("coluna");

  // Verifica se há colunas para remover
  if (colunas.length > 0) {
    // Obtém a última coluna adicionada
    var ultimaColuna = colunas[colunas.length - 1];

    // Remove a última coluna do contêiner
    ultimaColuna.parentNode.removeChild(ultimaColuna);

    // Remove a coluna do LocalStorage
    removerUltimoNumeroDoLocalStorage();
  }
}

function removerUltimoNumeroDoLocalStorage() {
  // Verifica se o LocalStorage é suportado pelo navegador
  if (typeof Storage !== "undefined") {
    // Recupera os números salvos no LocalStorage
    var numerosSalvos = localStorage.getItem("numeros");

    // Converte os números salvos em um array (se houver)
    var numeros = numerosSalvos ? JSON.parse(numerosSalvos) : [];

    // Remove o último número do array
    numeros.pop();

    // Armazena o array de números atualizado no LocalStorage
    localStorage.setItem("numeros", JSON.stringify(numeros));
  }
}

function mudarCor(icon) {
  // Verifica a cor atual do ícone
  var corAtual = icon.classList.contains("text-white") ? "text-white" : "text-green-500";

  // Altera a cor do ícone
  if (corAtual === "text-white") {
    icon.classList.remove("text-white");
    icon.classList.add("text-green-500");
  } else {
    icon.classList.remove("text-green-500");
    icon.classList.add("text-white");
  }
  
}

function salvarNumeroNoLocalStorage(numero) {
  // Verifica se o LocalStorage é suportado pelo navegador
  if (typeof Storage !== "undefined") {
    // Recupera os números salvos no LocalStorage (se houver)
    var numerosSalvos = localStorage.getItem("numeros");

    // Converte os números salvos em um array (se houver)
    var numeros = numerosSalvos ? JSON.parse(numerosSalvos) : [];
    // Adiciona o novo número com a data atual ao array
    numeros.push({ numero: numero, data: new Date().getTime() });

    // Armazena o array de números no LocalStorage
    localStorage.setItem("numeros", JSON.stringify(numeros));
  } else {
    // LocalStorage não suportado
    console.log("O navegador não suporta LocalStorage.");
  }
}

function removerNumerosExpirados() {
  // Verifica se o LocalStorage é suportado pelo navegador
  if (typeof Storage !== "undefined") {
    // Recupera os números salvos no LocalStorage (se houver)
    var numerosSalvos = localStorage.getItem("numeros");

    // Converte os números salvos em um array (se houver)
    var numeros = numerosSalvos ? JSON.parse(numerosSalvos) : [];

    // Obtém a data atual
    var dataAtual = new Date().getTime();

    // Filtra os números válidos (que não expiraram)
    numeros = numeros.filter(function (item) {
      // Calcula a diferença de tempo entre a data atual e a data em que o número foi adicionado
      var diferencaTempo = dataAtual - item.data;

      // Converte a diferença de tempo de milissegundos para dias
      var diferencaDias = diferencaTempo / (1000 * 60 * 60 * 24);

      // Retorna true se a diferença de dias for menor ou igual a 3 (não expirou)
      return diferencaDias <= 2;
    });

    // Armazena o array de números atualizado no LocalStorage
    localStorage.setItem("numeros", JSON.stringify(numeros));
  }
}


function recuperarNumerosDoLocalStorage() {
  // Verifica se o LocalStorage é suportado pelo navegador
  if (typeof Storage !== "undefined") {
    // Recupera os números salvos do LocalStorage
    var numerosSalvos = localStorage.getItem("numeros");

    // Converte os números salvos em um array (se houver)
    var numeros = numerosSalvos ? JSON.parse(numerosSalvos) : [];

    // Retorna o array de números
    return numeros;
  } else {
    // LocalStorage não suportado
    console.log("O navegador não suporta LocalStorage.");
    return [];
  }
}

function atualizarCamposExistentes(numeros) {
  // Obtém todas as colunas presentes no contêiner
  var colunas = document.getElementsByClassName("coluna");

  // Verifica se o número de colunas é igual ao número de números recuperados
  if (colunas.length === numeros.length) {
    // Atualiza os valores dos campos existentes com os números recuperados
    for (var i = 0; i < colunas.length; i++) {
      var input = colunas[i].querySelector("input");
      input.value = numeros[i].numero;
    }
  }
}

// Antes de carregar a página, remove os números expirados
removerNumerosExpirados();

// Carrega os números do LocalStorage e exibe-os
var numeros = recuperarNumerosDoLocalStorage();
numeros.forEach(function (item) {
  adicionarColuna(item.numero);
});