const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configurações da Grelha Isométrica
const tileW = 80;  // Largura do bloco
const tileH = 40;  // Altura do bloco (metade da largura cria o efeito 3D)
const mapSize = 10; // Tamanho do mapa (10x10 blocos)

// Posição central do ecrã para começar a desenhar
let originX = canvas.width / 2;
let originY = canvas.height / 4;

// O Jogador (Você)
let player = { x: 0, y: 0 };

// Teclas
const keys = {};
window.addEventListener('keydown', e => {
    keys[e.key] = true;
    movePlayer(e.key);
});
window.addEventListener('keyup', e => keys[e.key] = false);

// Função mágica que converte as coordenadas 2D (x,y) em 3D Isométrico no ecrã
function toIso(x, y) {
    return {
        screenX: originX + (x - y) * tileW / 2,
        screenY: originY + (x + y) * tileH / 2
    };
}

// Desenha um quadrado de chão plano
function drawTile(x, y, color, borderColor) {
    const pos = toIso(x, y);
    ctx.beginPath();
    ctx.moveTo(pos.screenX, pos.screenY); // Topo
    ctx.lineTo(pos.screenX + tileW / 2, pos.screenY + tileH / 2); // Direita
    ctx.lineTo(pos.screenX, pos.screenY + tileH); // Fundo
    ctx.lineTo(pos.screenX - tileW / 2, pos.screenY + tileH / 2); // Esquerda
    ctx.closePath();
    
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
}

// Desenha um cubo em 3D (Para edifícios ou para o jogador)
function drawBlock(x, y, heightScale, colorTop, colorLeft, colorRight) {
    const pos = toIso(x, y);
    const zOffset = heightScale * tileH;

    // Face do Topo
    ctx.beginPath();
    ctx.moveTo(pos.screenX, pos.screenY - zOffset);
    ctx.lineTo(pos.screenX + tileW / 2, pos.screenY + tileH / 2 - zOffset);
    ctx.lineTo(pos.screenX, pos.screenY + tileH - zOffset);
    ctx.lineTo(pos.screenX - tileW / 2, pos.screenY + tileH / 2 - zOffset);
    ctx.closePath();
    ctx.fillStyle = colorTop;
    ctx.fill();

    // Face Esquerda
    ctx.beginPath();
    ctx.moveTo(pos.screenX - tileW / 2, pos.screenY + tileH / 2 - zOffset);
    ctx.lineTo(pos.screenX, pos.screenY + tileH - zOffset);
    ctx.lineTo(pos.screenX, pos.screenY + tileH);
    ctx.lineTo(pos.screenX - tileW / 2, pos.screenY + tileH / 2);
    ctx.closePath();
    ctx.fillStyle = colorLeft;
    ctx.fill();

    // Face Direita
    ctx.beginPath();
    ctx.moveTo(pos.screenX, pos.screenY + tileH - zOffset);
    ctx.lineTo(pos.screenX + tileW / 2, pos.screenY + tileH / 2 - zOffset);
    ctx.lineTo(pos.screenX + tileW / 2, pos.screenY + tileH / 2);
    ctx.lineTo(pos.screenX, pos.screenY + tileH);
    ctx.closePath();
    ctx.fillStyle = colorRight;
    ctx.fill();
}

// Movimentação em grelha
function movePlayer(key) {
    if (key === 'ArrowUp' && player.x > 0) player.x--;
    if (key === 'ArrowDown' && player.x < mapSize - 1) player.x++;
    if (key === 'ArrowLeft' && player.y > 0) player.y--;
    if (key === 'ArrowRight' && player.y < mapSize - 1) player.y++;
    
    document.getElementById('coords').innerText = `Posição: X: ${player.x}, Y: ${player.y}`;
}

// Desenha o mapa inteiro
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ordem de desenho é crucial (de trás para a frente)
    for (let x = 0; x < mapSize; x++) {
        for (let y = 0; y < mapSize; y++) {
            
            // Desenha a relva/rua (Chão base)
            drawTile(x, y, '#2ecc71', '#27ae60');

            // Exemplo de um "edifício" no mapa (na posição 4, 4)
            if (x === 4 && y === 4) {
                drawBlock(x, y, 1.5, '#bdc3c7', '#95a5a6', '#7f8c8d');
            }

            // Desenha o Jogador (Um bloco azul)
            if (player.x === x && player.y === y) {
                drawBlock(x, y, 1, '#3498db', '#2980b9', '#1f618d');
            }
        }
    }
}

// O Loop do Jogo
function runGame() {
    draw();
    requestAnimationFrame(runGame);
}

// Ajusta o tamanho se redimensionar a janela
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    originX = canvas.width / 2;
    originY = canvas.height / 4;
});

// Inicia
runGame();
