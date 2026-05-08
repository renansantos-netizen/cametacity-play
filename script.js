const mapScreen = document.getElementById('map-screen');
const gameScreen = document.getElementById('game-screen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurações do personagem
let player = { x: 100, y: 300, width: 30, height: 50, speed: 5 };
let gameActive = false;

// Ajusta o tamanho da tela do jogo
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);

// --- ESSA É A FUNÇÃO QUE O BOTÃO CHAMA ---
function startGame(local) {
    // Esconde o menu e mostra o jogo
    mapScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    // Atualiza o nome do local na tela
    document.getElementById('current-loc').innerText = local;
    
    resizeCanvas();
    
    // Garante que o jogador comece no lugar certo na calçada
    player.y = canvas.height * 0.7;
    player.x = 100;
    
    gameActive = true;
    runGame();
}

// Verifica quais teclas estão sendo apertadas
const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

// Movimenta o personagem
function update() {
    const calcadaTop = canvas.height * 0.6;
    const calcadaBottom = canvas.height - player.height;

    // Impede que ele saia da calçada e da tela
    if (keys['ArrowUp'] && player.y > calcadaTop) player.y -= player.speed;
    if (keys['ArrowDown'] && player.y < calcadaBottom) player.y += player.speed;
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += player.speed;
}

// Desenha a tela toda
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fundo - O Céu
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // O Rio Tocantins (Ao fundo)
    ctx.fillStyle = '#1c6cad';
    ctx.fillRect(0, canvas.height * 0.4, canvas.width, canvas.height * 0.2);

    // A Calçada / Rua
    ctx.fillStyle = "#808080"; 
    ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);

    // Postes de rede de internet
    ctx.fillStyle = "#444";
    for(let i = 0; i < canvas.width; i += 250) {
        ctx.fillRect(i, canvas.height * 0.35, 12, canvas.height * 0.25);
        // Fio de fibra óptica
        ctx.beginPath();
        ctx.moveTo(i, canvas.height * 0.35);
        ctx.lineTo(i + 250, canvas.height * 0.35);
        ctx.strokeStyle = "#222";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Algumas árvores simplificadas na margem do rio
    for(let i = 120; i < canvas.width; i += 250) {
        // Folhas
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.arc(i, canvas.height * 0.55, 30, 0, Math.PI * 2);
        ctx.fill();
        // Tronco
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(i - 5, canvas.height * 0.55 + 20, 10, 25);
    }

    // O Personagem (Você)
    ctx.fillStyle = "#ffcc00"; 
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Roda o jogo de forma contínua
function runGame() {
    if (!gameActive) return;
    
    update();
    draw();
    
    requestAnimationFrame(runGame);
}
