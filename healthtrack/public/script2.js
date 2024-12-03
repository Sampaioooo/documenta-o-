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
  
  // Função para exibir o resultado
  document.getElementById('imc-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    const sexo = document.getElementById('sexo').value;
    const idade = parseInt(document.getElementById('idade').value);
    const altura = parseInt(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);
  
    if (peso && altura && idade) {
      const imc = calcularIMC(peso, altura);
      const { pesoMinimo, pesoMaximo } = calcularPesoIdeal(altura);
  
      // Exibir IMC
      let resultadoIMC = `Seu IMC é ${imc.toFixed(2)}.`;
  
      if (imc < 18.5) {
        resultadoIMC += " Você está abaixo do peso ideal.";
      } else if (imc >= 18.5 && imc <= 24.9) {
        resultadoIMC += " Você está com o peso normal.";
      } else if (imc >= 25 && imc <= 29.9) {
        resultadoIMC += " Você está com sobrepeso.";
      } else if (imc >= 30 && imc <= 34.9) {
        resultadoIMC += " Você está com obesidade grau I.";
      } else if (imc >= 35 && imc <= 39.9) {
        resultadoIMC += " Você está com obesidade grau II.";
      } else {
        resultadoIMC += " Você está com obesidade grau III.";
      }
  
      // Exibir intervalo de peso ideal
      const intervaloPeso = `Seu peso ideal está entre ${pesoMinimo.toFixed(2)} kg e ${pesoMaximo.toFixed(2)} kg para sua altura.`;
  
      document.getElementById('resultado-imc').innerText = resultadoIMC;
      document.getElementById('peso-ideal').innerText = intervaloPeso;
    } else {
      document.getElementById('resultado-imc').innerText = 'Por favor, preencha todos os campos corretamente.';
    }
  });
  