const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const tileW = 60; const tileH = 30; const mapSize = 10;
let player = { x: 2, y: 2 };

function toIso(x, y) {
    return {
        screenX: (canvas.width / 2) + (x - y) * (tileW / 2),
        screenY: (canvas.height / 4) + (x + y) * (tileH / 2)
    };
}

function drawTile(x, y, color) {
    const pos = toIso(x, y);
    ctx.beginPath();
    ctx.moveTo(pos.screenX, pos.screenY);
    ctx.lineTo(pos.screenX + tileW / 2, pos.screenY + tileH / 2);
    ctx.lineTo(pos.screenX, pos.screenY + tileH);
    ctx.lineTo(pos.screenX - tileW / 2, pos.screenY + tileH / 2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.stroke();
}

function drawBlock(x, y, h, cT, cL, cR) {
    const pos = toIso(x, y);
    const z = h * tileH;
    // Topo
    ctx.beginPath();
    ctx.moveTo(pos.screenX, pos.screenY - z);
    ctx.lineTo(pos.screenX + tileW / 2, pos.screenY + tileH / 2 - z);
    ctx.lineTo(pos.screenX, pos.screenY + tileH - z);
    ctx.lineTo(pos.screenX - tileW / 2, pos.screenY + tileH / 2 - z);
    ctx.closePath(); ctx.fillStyle = cT; ctx.fill();
    // Lados
    ctx.beginPath();
    ctx.moveTo(pos.screenX - tileW / 2, pos.screenY + tileH / 2 - z);
    ctx.lineTo(pos.screenX, pos.screenY + tileH - z);
    ctx.lineTo(pos.screenX, pos.screenY + tileH);
    ctx.lineTo(pos.screenX - tileW / 2, pos.screenY + tileH / 2);
    ctx.closePath(); ctx.fillStyle = cL; ctx.fill();
    ctx.beginPath();
    ctx.moveTo(pos.screenX, pos.screenY + tileH - z);
    ctx.lineTo(pos.screenX + tileW / 2, pos.screenY + tileH / 2 - z);
    ctx.lineTo(pos.screenX + tileW / 2, pos.screenY + tileH / 2);
    ctx.lineTo(pos.screenX, pos.screenY + tileH);
    ctx.closePath(); ctx.fillStyle = cR; ctx.fill();
}

window.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && player.x > 0) player.x--;
    if (e.key === 'ArrowDown' && player.x < mapSize - 1) player.x++;
    if (e.key === 'ArrowLeft' && player.y > 0) player.y--;
    if (e.key === 'ArrowRight' && player.y < mapSize - 1) player.y++;
    document.getElementById('coords').innerText = `Posição: X:${player.x} Y:${player.y}`;
});

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < mapSize; x++) {
        for (let y = 0; y < mapSize; y++) {
            drawTile(x, y, '#2ecc71'); // Relva de Cametá
            if (x === 5 && y === 5) drawBlock(x, y, 1.5, '#ecf0f1', '#bdc3c7', '#95a5a6'); // Prédio
            if (player.x === x && player.y === y) drawBlock(x, y, 0.8, '#3498db', '#2980b9', '#1f618d'); // Jogador
        }
    }
    requestAnimationFrame(loop);
}
loop();
