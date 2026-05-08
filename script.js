const mapScreen = document.getElementById('map-screen');
const gameScreen = document.getElementById('game-screen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 100, y: 300, width: 30, height: 50, speed: 4 };
let gameActive = false;

function startGame(local) {
    document.getElementById('current-loc').innerText = local;
    mapScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    canvas.width = 800;
    canvas.height = 500;
    gameActive = true;
    runGame();
}

const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function update() {
    if (keys['ArrowUp'] && player.y > 200) player.y -= player.speed;
    if (keys['ArrowDown'] && player.y < 450) player.y += player.speed;
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x < 770) player.x += player.speed;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenha a calçada/rua de Cametá
    ctx.fillStyle = "#808080"; 
    ctx.fillRect(0, 200, canvas.width, 300);
    
    // Simulação de postes de rede (sua área de atuação)
    ctx.fillStyle = "#444";
    for(let i=0; i<canvas.width; i+=150) {
        ctx.fillRect(i, 100, 10, 150);
    }

    // O Personagem (A pessoa que você conduz)
    ctx.fillStyle = "#ffcc00";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function runGame() {
    if (!gameActive) return; // Para o jogo se não estiver ativo [cite: 10]
    update(); // Processa os movimentos das setas [cite: 13]
    draw();   // Desenha o cenário e o personagem [cite: 16, 20]
    
    // Essencial para criar o movimento contínuo
    requestAnimationFrame(runGame); 
}
