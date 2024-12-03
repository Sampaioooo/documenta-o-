// Função para calcular o IMC
function calcularIMC(peso, altura) {
    altura = altura / 100; // Convertendo altura de cm para metros
    return peso / (altura * altura);
  }
  
  // Função para calcular o intervalo de peso ideal
  function calcularPesoIdeal(altura) {
    altura = altura / 100; // Convertendo altura de cm para metros
    const imcMinimo = 18.5;
    const imcMaximo = 24.9;
  
    const pesoMinimo = imcMinimo * (altura * altura);
    const pesoMaximo = imcMaximo * (altura * altura);
  
    return { pesoMinimo, pesoMaximo };
  }
  
  // Função para exibir o gráfico de peso
  function exibirGrafico() {
    const ctx = document.getElementById('graficoPeso').getContext('2d');
    const graficoPeso = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'], // Exemplo de períodos
        datasets: [{
          label: 'Peso (kg)',
          data: [70, 69, 68, 67], // Dados fictícios
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }]
      }
    });
  }
  
  // Função para definir e exibir metas
  document.getElementById('form-metas').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    const meta = document.getElementById('meta').value;
    
    if (meta) {
      document.getElementById('resultado-meta').innerText = `Sua meta definida: ${meta}`;
    } else {
      document.getElementById('resultado-meta').innerText = 'Por favor, defina uma meta!';
    }
  });
  
  // Função para configurar notificações
  function configurarNotificacoes() {
    // Aqui você pode integrar com a API de notificações do navegador
    alert("Você receberá notificações para metas e consultas!");
  }
  
  // Chamar a função para exibir gráfico de peso ao carregar o painel
  document.addEventListener('DOMContentLoaded', function() {
    exibirGrafico();
    configurarNotificacoes();
  });
  