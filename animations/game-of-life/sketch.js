let dim = 50;

let w = 500;
let h = 500;

let sw = w / dim;
let sh = h / dim;

let matrix = [];
let tmpMatrix = [];

function setup() {
    createCanvas(w, h);
    for (let i = 0; i < dim * dim; i++) {
        if (Math.random() < 0.4) {
            matrix.push(1);
        } else {
            matrix.push(0);
        }
        tmpMatrix.push(0);
    }
    frameRate(10);
}

function updateMatrix() {
    let x, y;
    for (let i = 0; i < dim * dim; i++) {
        x = i % dim;
        y = Math.floor(i / dim)
        count = 0;
        if (x > 1) {
            count += matrix[y * dim + x - 1]
            if (y > 1) {
                count += matrix[(y - 1) * dim + x - 1]
            }
            if (y < (dim - 1)) {
                count += matrix[(y + 1) * dim + x - 1]
            }
        }
        if (x < (dim - 1)) {
            count += matrix[y * dim + x + 1]
            if (y > 1) {
                count += matrix[(y - 1) * dim + x + 1]
            }
            if (y < (dim - 1)) {
                count += matrix[(y + 1) * dim + x + 1]
            }
        }
        if (y > 1) {
            count += matrix[(y - 1) * dim + x]
        }
        if (y < (dim - 1)) {
            count += matrix[(y + 1) * dim + x]
        }
        if (count < 2 || count > 3) {
            tmpMatrix[(y) * dim + x] = 0
        } else if (count == 3) {
            tmpMatrix[(y) * dim + x] = 1
        } else {
            tmpMatrix[(y) * dim + x] = matrix[(y) * dim + x]
        }
    }

    for (let i = 0; i < dim * dim; i++) {
        matrix[i] = tmpMatrix[i]
    }
}

function draw() {
    updateMatrix();
    for (let i = 0; i < dim * dim; i++) {
        let x = i % dim;
        let y = Math.floor(i / dim);
        if (matrix[i]) {
            fill(255, 0, 0);
        } else {
            fill(255, 255, 255);
        }
        square(x * sw, y * sw, sw)
    }
}