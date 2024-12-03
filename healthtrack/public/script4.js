// Variáveis para armazenar as informações do perfil 
let perfil = {
    nome: "João Silva",
    email: "joao.silva@example.com",
    sexo: "Homem",
    idade: 35,
    altura: 170,
    peso: 72
  };
  
  // Função para exibir os dados do perfil
  function exibirPerfil() {
    document.getElementById('perfil-nome').innerText = perfil.nome || "Não definido";
    document.getElementById('perfil-email').innerText = perfil.email || "Não definido";
    document.getElementById('perfil-sexo').innerText = perfil.sexo || "Não definido";
    document.getElementById('perfil-idade').innerText = perfil.idade || "Não definido";
    document.getElementById('perfil-altura').innerText = perfil.altura || "Não definido";
    document.getElementById('perfil-peso').innerText = perfil.peso || "Não definido";
  }
  
  // Função para editar os dados do perfil
  document.getElementById('editarPerfilBtn').addEventListener('click', function() {
    // Exibe o formulário de edição
    document.getElementById('form-editar').style.display = 'block';
  });
  
  // Função para atualizar os dados do perfil
  document.getElementById('editar-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    // Atualiza os dados do perfil
    perfil.nome = document.getElementById('novoNome').value || perfil.nome;
    perfil.email = document.getElementById('novoEmail').value || perfil.email;
    perfil.peso = document.getElementById('novoPeso').value || perfil.peso;
  
    // Exibe os dados atualizados
    exibirPerfil();
  
    // Esconde o formulário de edição
    document.getElementById('form-editar').style.display = 'none';
  });
  
  // Exibir o perfil inicial quando a página carregar
  window.onload = exibirPerfil;
  