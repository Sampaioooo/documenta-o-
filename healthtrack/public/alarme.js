// Função para tocar o som de notificação
const tocarRingtone = () => {
    const audio = new Audio('files/ringtone.mp3');
    audio.play();
  };
  
  // Função para enviar notificação
  const enviarNotificacao = () => {
    if (Notification.permission === 'granted') {
      new Notification('Alarme de Evento!', {
        body: 'Seu evento está prestes a acontecer!',
        icon: 'files/alarme-icon.png', // Substitua pelo caminho do seu ícone
      });
    } else {
      console.log('Permissão para notificações não concedida.');
    }
  };
  
  // Função para carregar eventos do localStorage
  const carregarEventos = () => {
    return JSON.parse(localStorage.getItem("eventos")) || [];
  };
  
  // Função para configurar alarme
  const configurarAlarme = (evento) => {
    const dataEvento = new Date(evento.start);  // A data do evento
    const agora = new Date();                    // A data/hora atual
    const tempoRestante = dataEvento - agora;    // Diferença de tempo até o evento
  
    if (tempoRestante > 0) {
      setTimeout(() => {
        tocarRingtone();  // Toca o alarme
        enviarNotificacao();  // Envia a notificação
      }, tempoRestante);
    }
  };
  
  // Função para verificar eventos e configurar alarmes quando a página for carregada
  const verificarAlarmes = () => {
    const eventos = carregarEventos();
    eventos.forEach(evento => {
      configurarAlarme(evento);
    });
  };
  
  // Solicita permissão para enviar notificações assim que a página for carregada
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Permissão concedida para notificações.');
      } else {
        console.log('Permissão negada para notificações.');
      }
    });
  }
  
  // Ao carregar a página, verifica os eventos e configura os alarmes
  document.addEventListener('DOMContentLoaded', () => {
    verificarAlarmes();
  });
  