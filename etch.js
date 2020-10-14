// Parent element where the grid will be drawn
const container = document.getElementById('container');
let dimensions = 16

// Buttons to create and reset grid
const create = document.getElementById('create');
const reset = document.getElementById('reset');
const black = document.getElementById('black');
const darken = document.getElementById('darken');
const random = document.getElementById('random');

function createGrid(dimensions) {
    // Make i equal to the square of the dimensions and run the for loop
    // that many times
    for (i = Math.pow(dimensions, 2); i >= 1; i--) {
        // Create a div element and add to the container element
        grid = document.createElement('div');
        container.appendChild(grid);
        // Adjust the container CSS grid dimensions
        container.style.gridTemplateColumns = `repeat(${dimensions}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${dimensions}, 1fr)`;
        // Set identity of each grid item to the corresponding value of i
        grid.setAttribute('id', `${i}`);
        // Set class for styling
        grid.setAttribute('class', 'box');
    }
}

function setDimensions() {
    let answer = prompt('What dimensions would you like? (1-100)');
    if (answer >= 1 && answer <= 100) {
        dimensions = answer;
    } else {
        alert('Please enter a number 1-100');
    }
    return dimensions
}

function remDivs() {
    while (container.firstChild) {
        container.firstChild.remove();
    }
}

function fill() {
    for (i = Math.pow(dimensions, 2); i >= 1; i--) {
        let square = document.getElementById(`${i}`);
        square.setAttribute('opacity', 0);
        square.addEventListener('mouseover', function () {
            if (black.checked) {
                let r = '0';
                let b = '0';
                let g = '0';
                let a = '1';
                this.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
            } else if (darken.checked) {
                opacity = parseInt(this.getAttribute('opacity'));
                console.log(opacity);
                opacity++;
                console.log(this.getAttribute('opacity'));
                this.style.backgroundColor = `rgba(0,0,0,${opacity/10})`;
                this.setAttribute('opacity', opacity);
            } else if (random.checked) {
                let r = Math.floor(Math.random() * 256);
                let b = Math.floor(Math.random() * 256);
                let g = Math.floor(Math.random() * 256);
                this.style.backgroundColor = `rgb(${r},${g},${b})`; 
            }
        });
    }
}

createGrid(dimensions);
fill();

create.addEventListener('click', function() {
    setDimensions()
    remDivs()
    createGrid(dimensions)
    fill();
})

reset.addEventListener('click', function() {
    remDivs()
    createGrid(dimensions)
    fill();
})