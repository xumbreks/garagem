function adicionarColuna() {

  // Cria uma nova coluna
  var coluna = document.createElement("div");
  coluna.classList.add("coluna", "flex",
   "justify-center", "items-center", "space-x-2");

  // Cria um campo de entrada para adicionar números
  var input = document.createElement("input");
  input.type = "number";
  input.classList.add("border", "border-gray-500", "p-2", "bg-transparent", "mt-2");
  input.setAttribute("inputmode", "numeric"); // Adiciona o atributo inputmode

  coluna.appendChild(input);
  
  // Adiciona o ícone ao lado da coluna
  var icon = document.createElement("i");
      icon.classList.add("ph", "ph-check-circle", "mt-2", "text-4xl", "text-white");
      icon.addEventListener("click", function() {
        mudarCor(icon);
      });
      coluna.appendChild(icon);

  // Adiciona o ícone ao lado da coluna
  var icon2 = document.createElement("i");
      icon2.classList.add("ph", "ph-check-circle", "mt-2", "text-4xl", "text-white");
      icon2.addEventListener("click", function() {
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