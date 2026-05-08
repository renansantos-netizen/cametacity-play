/* script.js - Cenário Melhorado */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const mapScreen = document.getElementById('map-screen');
const gameScreen = document.getElementById('game-screen');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let target = { x: 100, y: 100, size: 40 };

// Pontos de partida válidos apenas para a área urbana de Cametá
const points = ['Orla de Cametá', 'Centro Histórico', 'Bairro da Aldeia'];

function drawTarget() {
    ctx.fillStyle = '#27ae60'; // Cor da RiosNet
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Texto Wi-Fi com melhor contraste
    ctx.font = '20px Arial';
    ctx.fillStyle = "white";
    ctx.textAlign = 'center';
    ctx.fillText("WI-FI", target.x, target.y + 7);
}

function moveTarget() {
    target.x = Math.random() * (canvas.width - 100) + 50;
    target.y = Math.random() * (canvas.height - 100) + 50;
}

// Função para desenhar o cenário urbano de Cametá
function drawScenario() {
    // Fundo - O Céu
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // O Rio Tocantins (Ao fundo)
    ctx.fillStyle = '#1c6cad';
    ctx.fillRect(0, canvas.height * 0.4, canvas.width, canvas.height * 0.2);

    // A Calçada / Rua
    ctx.fillStyle = "#808080"; 
    ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);

    // Postes de rede (sua área de atuação)
    ctx.fillStyle = "#444";
    for(let i=0; i<canvas.width; i+=150) {
        ctx.fillRect(i, canvas.height * 0.35, 10, canvas.height * 0.35);
    }
    
    // Algumas árvores simplificadas para embelezar
    ctx.fillStyle = '#228B22';
    for(let i=75; i<canvas.width; i+=200) {
        ctx.beginPath();
        ctx.arc(i, canvas.height * 0.55, 30, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScenario(); // Desenha o cenário primeiro
    drawTarget();   // Desenha o alvo por cima
    requestAnimationFrame(animate);
}

canvas.addEventListener('mousedown', (e) => {
    const dist = Math.hypot(e.clientX - target.x, e.clientY - target.y);
    if (dist < target.size) {
        score++;
        scoreElement.innerText = score;
        moveTarget();
    }
});

// Nova função para iniciar o jogo escolhendo a fase
function startGame(local) {
    if (points.includes(local)) {
        console.log(`Iniciando jogo em: ${local}`);
        mapScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        moveTarget();
        animate();
    }
}
