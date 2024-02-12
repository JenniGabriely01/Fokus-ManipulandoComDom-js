const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; /* caso nã funcionar ele retorna um array vazio */

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
    const imagemBotao = document.createElement('img');


    imagemBotao.setAttribute('src', '/imagens/edit.png');
    botao.append(imagemBotao);

    li.append(svg);
    li.append(p);
    li.append(botao);

    return li;
};

btnAdicionarTarefa.addEventListener('click', () => {
    /* toggle - alternancia */
    formAdicionarTarefa.classList.toggle('hidden')
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

    /* armazenamento local - permite que quando eu atualizo a pag os infos nao somem */
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); /* transformando em uma string */
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
});


tarefas.forEach(tarefa => {
    const ElementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(ElementoTarefa);
});