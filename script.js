const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let target = { x: 100, y: 100, size: 40 };

function drawTarget() {
    ctx.fillStyle = '#27ae60'; // Cor da RiosNet
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.fillText("WI-FI", target.x - 15, target.y + 5);
}

function moveTarget() {
    target.x = Math.random() * (canvas.width - 100) + 50;
    target.y = Math.random() * (canvas.height - 100) + 50;
}

canvas.addEventListener('mousedown', (e) => {
    const dist = Math.hypot(e.clientX - target.x, e.clientY - target.y);
    if (dist < target.size) {
        score++;
        scoreElement.innerText = score;
        moveTarget();
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTarget();
    requestAnimationFrame(animate);
}

moveTarget();
animate();