body {
    margin: 0;
    overflow: hidden;
    background-color: #1a252c; /* Cor de fundo escura */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: white;
}

#ui-container {
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.8);
    padding: 15px 25px;
    border-radius: 10px;
    border-left: 4px solid #f39c12;
    z-index: 10;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
}

h1 {
    margin: 0 0 10px 0;
    font-size: 1.5rem;
    color: #f39c12;
}

p {
    margin: 0 0 10px 0;
    font-size: 0.9rem;
    color: #ccc;
}

#coords {
    font-family: monospace;
    font-size: 1.1rem;
    color: #3498db;
}

canvas {
    display: block;
}
