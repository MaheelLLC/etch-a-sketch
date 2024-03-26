const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const grid = document.querySelector('#grid');
const colorPicker = document.querySelector('#colorPicker');
const colorBtn = document.querySelector('#color');
const rainbowBtn = document.querySelector('#rainbow');
const eraserBtn = document.querySelector('#eraser');
const clearBtn = document.querySelector('#clear');
const sizeValue = document.querySelector('#sizeValue');
const sizeSlider = document.querySelector('#sizeSlider');

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

colorPicker.addEventListener('input', () => setCurrentColor(colorPicker.value));
colorBtn.addEventListener('click', () => setCurrentMode('color'));
rainbowBtn.addEventListener('click', () => setCurrentMode('rainbow'));
eraserBtn.addEventListener('click', () => setCurrentMode('eraser'));
clearBtn.addEventListener('click', () => reloadGrid());

sizeSlider.addEventListener('mousemove', (e) => {
    sizeValue.textContent = e.target.value;
});
sizeSlider.addEventListener('change', (e) => changeSize(e.target.value));


function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function changeSize(value) {
    sizeValue.textContent = value;
    setCurrentSize(value);
    reloadGrid();
}

function clearGrid() {
    grid.innerHTML = '';
}

function reloadGrid() {
    clearGrid();
    createFlexGrid(currentSize);
}

function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mousedown', (e) => changeColor(e));
        cell.addEventListener('mouseover', (e) => changeColor(e));
        grid.appendChild(cell);
    }
}

// Alternative way to create grid using Flexbox
function createFlexGrid(size) {
    grid.style.display = 'flex';
    grid.style.flexWrap = 'wrap';

    // Calculate cell width based on grid size
    const cellWidth = 100 / size + '%';

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.width = cellWidth;
        cell.style.height = cellWidth;
        cell.addEventListener('mousedown', (e) => changeColor(e));
        cell.addEventListener('mouseover', (e) => changeColor(e));
        cell.addEventListener('dragstart', (e) => e.preventDefault());
        grid.appendChild(cell);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'color') {
        e.target.style.backgroundColor = colorPicker.value;
    }
    else if (currentMode === 'rainbow') {
        e.target.style.backgroundColor = getRandomColor();
    }
    else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe';
    }
}

function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
}

function activateButton(mode) {
    if (currentMode === mode) return;
    if (mode === 'color') {
        colorBtn.classList.add('active');
        rainbowBtn.classList.remove('active');
        eraserBtn.classList.remove('active');
    }
    else if (mode === 'rainbow') {
        colorBtn.classList.remove('active');
        rainbowBtn.classList.add('active');
        eraserBtn.classList.remove('active');
    }
    else if (mode === 'eraser') {
        colorBtn.classList.remove('active');
        rainbowBtn.classList.remove('active');
        eraserBtn.classList.add('active');
    }
    else if (mode === 'clear') {
        colorBtn.classList.remove('active');
        rainbowBtn.classList.remove('active');
        eraserBtn.classList.remove('active');
    }
}


window.onload = () => {
    createFlexGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}