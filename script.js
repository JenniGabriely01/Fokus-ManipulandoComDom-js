const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button'); /* selecionando todos os botoes com essa classe */
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');

/* colocando a musica em loop */
musica.loop = true;
const startPauseBt = document.querySelector('#start-pause');

/* temporizador */
let tempoDecorridoEmSegundos = 1500;
let intervaloID = null;


/* evento changue (checkbox) */
musicaFocoInput.addEventListener('change', () => {
    /* paused - propriedade do 'audio' */
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    };
});

/* evento click */
focoBt.addEventListener('click', () => { /* tudo que for "contexto" quando o botao foco clicado vai mudar para o "foco" */
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active')
});

function alterarContexto(contexto) {

    mostrarTempo();
    /* removendo a classe active de cada um dos botões */
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    /* setATribute = Ele é usado para definir ou atualizar o valor de um atributo em um elemento HTML */
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    switch (contexto) {

        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}


/* funcao da contagem */
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        alert('Tempo finalizado')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('focoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo(); /* Chamando a function de mostrar o tempo */
}


/* o evento click de uma função tem q ficar logo abaixo dele */
/* quando o botao for clicado a funcaç contagem regressiva é ativda */
startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloID) {
        audioPausa.play();
        zerar()
        return
    }
    audioPlay.play();
    intervaloID = setInterval(contagemRegressiva, 1000),
        iniciarOuPausarBt.textContent = "Pausar", /* quando o botao de comecar estiver funcionando mudei o texto para "Pausar" */
        iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`);
}

function zerar() {
    /* clearInterval = interrompe algum codigo */
    clearInterval(intervaloID);
    iniciarOuPausarBt.textContent = "Começar"; /* quando o usario clicar no botao após inicar ele, o botao voltara pra a texto inicial */
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloID = null;
};

/* mostrando o tempo na tela */
function mostrarTempo() {
    /* formatando numero */
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: "2-digit", second: '2-digit' });
    tempoNaTela.innerHTML = `${tempoFormatado}`
};

mostrarTempo(); /* chamando a function no esopo global para ela sempre aparecer */