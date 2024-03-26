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

let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;

function createGrid(size) {
    grid.style.cssText = 'display: flex; flex-wrap: wrap;';
    const cellSize = 100 / size;
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.style.width = `${cellSize}%`;
        cell.style.height = `${cellSize}%`;
        cell.addEventListener('mouseover', changeColor);
        cell.addEventListener('mousedown', changeColor);
        cell.addEventListener('dragstart', (e) => e.preventDefault());
        grid.appendChild(cell);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } 
    else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe';
    }
    else if (currentMode === 'rainbow') {
        e.target.style.backgroundColor = getRandomColor();
    }   
}

function getRandomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

function setCurrentColor(e) {
    currentColor = e.target.value;
}

colorPicker.addEventListener('change', setCurrentColor);

function activateButton(mode) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.id === mode) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

colorBtn.addEventListener('click', () => setCurrentMode('color'));
rainbowBtn.addEventListener('click', () => setCurrentMode('rainbow'));
eraserBtn.addEventListener('click', () => setCurrentMode('eraser'));

function clearGrid() {
    grid.innerHTML = '';
}

function reloadGrid() {
    clearGrid();
    createGrid(currentSize);
}

clearBtn.addEventListener('click', reloadGrid);

function updateSizeValue(value) {
    sizeValue.textContent = value;
}

function setCurrentSize(value) {
    currentSize = value;
}

function updateSize() {
    setCurrentSize(sizeSlider.value);
    updateSizeValue(currentSize);
    reloadGrid();
}

sizeSlider.addEventListener('input', updateSize);

window.onload = () => {
    createGrid(DEFAULT_SIZE);
    updateSizeValue(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}