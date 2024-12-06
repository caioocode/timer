const btnStart = document.getElementById('btn-start');
const btnStop = document.getElementById('btn-stop');
const btnContinue = document.getElementById('btn-continue');
const btnReset = document.getElementById('btn-reset');
let interval;
let currentDuration; // Variável para armazenar o tempo restante
let initialDuration; // Variável para armazenar a duração inicial

// Adicionando círculo
let display = document.getElementById('timer');
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

// Configura o tamanho do círculo inicial
circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `0`;

// Função para atualizar o círculo
function updateCircle(timer) {
  const offset = circumference * (1 - timer / initialDuration);
  circle.style.strokeDashoffset = offset;
}

// Botão iniciar
btnStart.addEventListener('click', () => {
  const hours = document.getElementById('hour');
  const minutes = document.getElementById('minute');
  const seconds = document.getElementById('second');

  initialDuration = (parseInt(hours.value) * 60 * 60) + (parseInt(minutes.value) * 60) + (parseInt(seconds.value));
  currentDuration = initialDuration;

  display = document.getElementById('timer');
  startTimer(currentDuration, display);
});

// Botão stop
btnStop.addEventListener('click', () => {
  clearInterval(interval); // Parar o intervalo (parar o timer)
});

// Botão continue
btnContinue.addEventListener('click', () => {
  if (currentDuration > 0) {
    startTimer(currentDuration, display);
  }
});

// Botão reset
btnReset.addEventListener('click', () => {
  clearInterval(interval); // Parar o intervalo (parar o timer)
  currentDuration = 0; // Redefinir o tempo restante
  initialDuration = 0; // Redefinir a duração inicial
  const display = document.getElementById('timer');
  display.innerHTML = '00:00:00';
  circle.style.strokeDashoffset = `0`; // Resetar o círculo
});

// Função iniciar timer
const startTimer = (duration, display) => {
  clearInterval(interval); // Garantir que não há outro intervalo em execução

  let timer = duration;
  interval = setInterval(() => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    currentDuration = timer; // Atualizar o tempo restante para o botão "Continuar"

    // Formatar para 2 dígitos
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    display.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    // Atualiza o círculo
    updateCircle(timer);

    timer--;

    if (timer < 0) {
      display.innerHTML = 'ACABOU!!!';
      clearInterval(interval); // Parar o timer quando acabar
      circle.style.strokeDashoffset = `0`; // Garantir o reset do círculo
    }
  }, 1000);
};
