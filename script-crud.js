const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const btnRemoverTodas = document.querySelector('#btn-remover-todas');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; /* caso nã funcionar ele retorna um array vazio */
let TarefaSelecionada = null;
let LiTarefaSelecionada = null;

/* guardando dados */
function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `

    const p = document.createElement('p');
    p.textContent = tarefa.descricao
    p.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    /* editar a tarefa já criada, mexendo no onclick do meu botao */
    botao.onclick = () => {
        /* debugger */
        const novaDescricao = prompt("Qual o nome da tarefa?");

        if (novaDescricao) {
            /* atualizando o p, o que for digitado no prompt ficará escrito */
            p.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        }

    };

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');
    botao.append(imagemBotao);

    li.append(svg);
    li.append(p);
    li.append(botao);

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = () => {

            /* selecionano tudo que tem essa classe */
            document.querySelectorAll('.app__section-task-list-item-active')
                /* removendo a classe, para que so o que estiver selecionado fique com a borda branca */
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                });

            if (TarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = ''
                TarefaSelecionada = null;
                LiTarefaSelecionada = null;
                return
            };

            TarefaSelecionada = tarefa;
            LiTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao

            li.classList.add('app__section-task-list-item-active')
        };
    };


    return li;
};

btnAdicionarTarefa.addEventListener('click', () => {
    /* toggle - alternancia */
    formAdicionarTarefa.classList.toggle('hidden');
});

/* submit - submeter */
formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault(); /* impede comportamento padrão (nesse caso, é para a página não atualizar) */

    /* criando um objeto */
    const tarefa = {
        descricao: textArea.value /* armazenando o que o usuario escrever */
    }

    tarefas.push(tarefa); /* colocando a const tarefas aqui */
    const ElementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(ElementoTarefa);

    atualizarTarefas();
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
});


tarefas.forEach(tarefa => {
    const ElementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(ElementoTarefa);
});

document.addEventListener('focoFinalizado', () => {
    if (TarefaSelecionada && LiTarefaSelecionada) {
        LiTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        LiTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        LiTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        TarefaSelecionada.completa = true;
        atualizarTarefas();
    };
});

const removerTarefas = (somenteCompletas) => {

    /* if ternario */
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    });

    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas();
};

/* quando o onclick acontecer executa a const de remover tarefas */
btnRemoverConcluidas.onclick = () => removerTarefas(true);
btnRemoverTodas.onclick = () => removerTarefas(false);