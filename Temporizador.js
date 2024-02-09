const startPauseBt = document.querySelector('#start-pause');

/* temporizador */
let tempoDecorridoEmSegundos = 5;
let intervaloID = null;

/* funcao da contagem */
const contagemRegrassiva = () => {
    iniciar();
    tempoDecorridoEmSegundos -= 1;
    console.log('Temporizador' + tempoDecorridoEmSegundos);
};

/* o evento click de uma função tem q ficar logo abaixo dele */
/* quando o botao for clicado a funcaç contagem regressiva é ativda */
startPauseBt.addEventListener('click', contagemRegrassiva);

/* 1000 - 1 segundo */
function iniciar (){
    intervaloID = setInterval(contagemRegrassiva, 1000);
};