// Recuperar as informações do usuário
const user = JSON.parse(localStorage.getItem('user'));

// Exibir as informações no perfil
document.getElementById('peso-profile').textContent = user.peso;
document.getElementById('meta-profile').textContent = user.meta;

// Função para calcular IMC
const calcularIMC = (peso, altura) => {
    return peso / (altura * altura);
};

// Calcular e exibir o IMC no perfil
const imc = calcularIMC(user.peso, user.altura);
document.getElementById('imc-profile').textContent = imc.toFixed(2);

// Exibir profissionais de saúde cadastrados
const professionalsList = document.getElementById('professionals-list');
user.profissionais.forEach(prof => {
    const listItem = document.createElement('li');
    listItem.textContent = `${prof.nome} - ${prof.especialidade}`;
    professionalsList.appendChild(listItem);
});

// Exibir conquistas
const conquestsList = document.getElementById('conquests-list');
user.conquistas.forEach(conquest => {
    const listItem = document.createElement('li');
    listItem.textContent = conquest;
    conquestsList.appendChild(listItem);
});

// Voltar para o dashboard
document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'dashboard.html';
});
