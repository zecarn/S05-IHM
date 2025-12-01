function openMenu() {
  document.getElementById("menu_aba").style.display = "block"; 
}

function closeMenu() {
  document.getElementById("menu_aba").style.display = "none";    
}

function temaLim() {
    document.documentElement.style.setProperty('--cor-click', '#389625ff');
    document.documentElement.style.setProperty('--cor-sombra', '#9b0a59');
    document.documentElement.style.setProperty('--cor-text', 'black');
    document.documentElement.style.setProperty('--cor-back1', '#CEF09D');
    document.documentElement.style.setProperty('--cor-back2', '#4f6a93');
    document.documentElement.style.setProperty('--md-sys-color-primary', '#267a23ff');
}

function temaInatel() {
    document.documentElement.style.setProperty('--cor-click', '#126ae2');
    document.documentElement.style.setProperty('--cor-sombra', '#0a599b');
    document.documentElement.style.setProperty('--cor-text', 'black');
    document.documentElement.style.setProperty('--cor-back1', '#edf2f4');
    document.documentElement.style.setProperty('--cor-back2', '#6a937a');
    document.documentElement.style.setProperty('--md-sys-color-primary', '#126ae2');
}

function temaDark() {
    const cores = {
        '--cor-click': '#000000ff',
        '--cor-sombra': '#8d8d8dff',
        '--cor-text': 'black',
        '--cor-back1': '#000000ff',
        '--cor-back2': '#0b1018ff',
        '--md-sys-color-primary': '#5a5a5aff'
    };

    for (const [variavel, valor] of Object.entries(cores)) {
        document.documentElement.style.setProperty(variavel, valor);
    }
}

// ===== FUNCIONALIDADE DO CHAT DE INTERCÂMBIO =====

let chatDisponivel = null;
let chatMessages = [];

function openIntercambioChat() {
    const modal = document.getElementById("chat-modal");
    const chatBody = document.getElementById("chat-body");
    const chatFooter = document.getElementById("chat-footer");
    
    // Gera aleatoriamente se o chat está disponível (1) ou não (2)
    chatDisponivel = Math.random() < 0.5 ? 1 : 2;
    
    // Limpa mensagens anteriores
    chatBody.innerHTML = '';
    chatFooter.innerHTML = '';
    chatMessages = [];
    
    if (chatDisponivel === 1) {
        // Chat disponível - mostra mensagem inicial e campo de input
        addBotMessage("Olá! Em que posso te ajudar?");
        
        chatFooter.innerHTML = `
            <input type="text" id="chat-input" placeholder="Digite sua mensagem...">
            <button onclick="sendMessage()">Enviar</button>
        `;
        
        // Permite enviar com Enter
        document.getElementById("chat-input").addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    } else {
        // Chat indisponível - mostra mensagem de indisponibilidade
        chatBody.innerHTML = `
            <div class="unavailable-message">
                Estou indisponível no momento, favor aguardar ou mandar e-mail para 
                <strong>Rosilene@intercambio.br</strong>
            </div>
        `;
    }
    
    modal.style.display = "block";
}

function closeIntercambioChat() {
    document.getElementById("chat-modal").style.display = "none";
}

function addBotMessage(text) {
    const chatBody = document.getElementById("chat-body");
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot';
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    chatMessages.push({ sender: 'bot', text: text });
}

function addUserMessage(text) {
    const chatBody = document.getElementById("chat-body");
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user';
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    chatMessages.push({ sender: 'user', text: text });
}

function sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Adiciona mensagem do usuário
    addUserMessage(message);
    input.value = '';
    
    // Simula resposta do bot após 1 segundo
    setTimeout(() => {
        const respostas = [
            "Entendo sua dúvida! Posso te ajudar com informações sobre intercâmbio.",
            "Ótima pergunta! Deixe-me verificar isso para você.",
            "Temos várias opções de intercâmbio disponíveis. Poderia me dar mais detalhes?",
            "Vou encaminhar sua solicitação para nossa equipe especializada!",
            "Que interessante! Temos programas em diversos países."
        ];
        const resposta = respostas[Math.floor(Math.random() * respostas.length)];
        addBotMessage(resposta);
    }, 1000);
}

// Fecha o modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById("chat-modal");
    if (event.target === modal) {
        closeIntercambioChat();
    }
}

// ===== CARROSSEL (mantido do código original) =====

const eventos = [
    {
        id: 1,
        title: 'Semana do Software 2025',
        date: '12/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'tech',
        description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 2,
        title: 'Workshop de IoT',
        date: '12/01',
        time: '08:00',
        location: 'Laboratório CS&I',
        type: 'tech',
        description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 3,
        title: 'Festa dos Alunos 2025',
        date: '18/05',
        time: '19:00',
        location: 'Área Esportiva do Inatel',
        type: 'cultural',
        description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 4,
        title: 'Feira de Oportunidades',
        date: '04/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'academic',
        description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
    }
];

const carousel = document.querySelector('.carousel');

function createCards() {
    eventos.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card-event'); 
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p style="margin-top:10px; color:#126ae2; font-weight:bold;">
                    <span class="material-symbols-outlined icon" style="font-size:16px; vertical-align:text-bottom;">calendar_month</span> 
                    ${event.date} às ${event.time}
                </p>
                <p style="color:#555; font-size:9pt;">
                    <span class="material-symbols-outlined icon" style="font-size:16px; vertical-align:text-bottom;">location_on</span> 
                    ${event.location}
                </p>
            </div>
        `;
        carousel.appendChild(card);
    });
}

createCards();

let index = 0;
function nextCard() {
    index = (index + 1) % eventos.length;
    updateCarousel();
}

function prevCard() {
    index = (index - 1 + eventos.length) % eventos.length;
    updateCarousel();
}

function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

let autoPlayInterval;
const carouselContainer = document.querySelector('.carousel-container');

function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextCard, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

carouselContainer.addEventListener('mouseenter', stopAutoPlay);
carouselContainer.addEventListener('mouseleave', startAutoPlay);

startAutoPlay();

document.getElementById('nextBtn').addEventListener('click', () => {
    nextCard();
    startAutoPlay(); 
});

document.getElementById('prevBtn').addEventListener('click', () => {
    prevCard();
    startAutoPlay();
});

let startX;
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    stopAutoPlay();
});
carousel.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
    startAutoPlay();
});