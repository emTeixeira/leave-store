// Selecionando os elementos HTML necessários para interações e navegação
const prevButton = document.getElementById('prev'); // Botão para navegar para a página anterior
const nextButton = document.getElementById('next'); // Botão para navegar para a próxima página
const items = document.querySelectorAll('.item'); // Todos os itens (páginas) no carrossel
const dots = document.querySelectorAll('.dot'); // Pontos indicadores de página
const numberIndicator = document.querySelector('.numbers'); // Indicador numérico da página atual
const list = document.querySelector('.list'); // Contêiner que abriga todos os itens (páginas)

let active = 0; // Inicializa o índice da página ativa, começando da primeira página
const total = items.length; // Número total de itens no carrossel
let timer; // Variável para armazenar o identificador do intervalo de navegação automática

/**
 * Função que atualiza a página ativa no carrossel.
 * @param {number} direction - A direção da navegação. 1 para próximo e -1 para anterior.
 */
function update(direction) {
    // Remove a classe 'active' do item e ponto ativos
    document.querySelector('.item.active').classList.remove('active');
    document.querySelector('.dot.active').classList.remove('active');

    // Atualiza o índice ativo dependendo da direção (1 para próximo, -1 para anterior)
    if (direction > 0) {
        active = active + 1; // Avança para a próxima página
        if (active === total) {
            active = 0; // Se atingir o final, volta para a primeira página
        }
    } else if (direction < 0) {
        active = active - 1; // Retrocede para a página anterior
        if (active < 0) {
            active = total - 1; // Vai para a última página se ultrapassar o índice 0
        }
    }

    // Adiciona a classe 'active' ao novo item e ponto, tornando-os visíveis
    items[active].classList.add('active');
    dots[active].classList.add('active');

    // Atualiza o indicador numérico da página atual
    numberIndicator.textContent = String(active + 1).padStart(2, '0'); // Exibe o número da página com 2 dígitos
}

/**
 * Função que inicia um intervalo de navegação automática com um tempo aleatório.
 * O intervalo é limpo e reiniciado a cada execução para evitar múltiplos timers.
 */
function startRandomInterval() {
    clearInterval(timer);  // Limpa o intervalo anterior para evitar múltiplos timers

    // Gera um intervalo aleatório entre 8 e 10 segundos (8000ms a 10000ms)
    const randomInterval = Math.floor(Math.random() * (10000 - 8000 + 1)) + 8000;

    // Define um novo intervalo para avançar automaticamente para a próxima página
    timer = setInterval(() => {
        update(1); // Avança para a próxima página automaticamente
    }, randomInterval); // Intervalo aleatório
}

// Inicia o intervalo de navegação automática com um intervalo aleatório
startRandomInterval();

// Event listener para o botão "prev" (anterior)
// Quando o botão de navegação "prev" for clicado, a página será alterada para a anterior
prevButton.addEventListener('click', () => {
    update(-1);  // Atualiza para a página anterior
    startRandomInterval();  // Reinicia o intervalo aleatório
});

// Event listener para o botão "next" (próximo)
// Quando o botão de navegação "next" for clicado, a página será alterada para a próxima
nextButton.addEventListener('click', () => {
    update(1);  // Atualiza para a próxima página
    startRandomInterval();  // Reinicia o intervalo aleatório
});

// Função para alternar a visibilidade do menu móvel
// Adiciona ou remove a classe 'active' do menu móvel para mostrar ou esconder o menu
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("active");
}
