let tileImages;

let dim = 20;

let w = 500;
let h = 500;

let sw = w / dim;
let sh = h / dim;

let matrix = [];
let cutOff = dim * dim + 10;

let tileConfig = {
    0: {
        "up": [1, 2, 3, 4],
        "down": [1, 2, 3, 4],
        "right": [1, 2, 3, 4],
        "left": [1, 2, 3, 4],
    },
    1: {
        "up": [2, 3, 4],
        "down": [2],
        "right": [1, 2, 4],
        "left": [1, 2, 3],
    },
    2: {
        "up": [1],
        "down": [1, 3, 4],
        "right": [1, 2, 4],
        "left": [1, 2, 3],
    },
    3: {
        "up": [2, 3, 4],
        "down": [1, 3, 4],
        "right": [1, 2, 4],
        "left": [4],
    },
    4: {
        "up": [2, 3, 4],
        "down": [1, 3, 4],
        "right": [3],
        "left": [1, 2, 3],
    }
}

function setup() {
    createCanvas(w, h);
    // Loading the tiles
    tileImages = [];

    tileImages.push(loadImage("simple/empty.png"));
    tileImages.push(loadImage("simple/up.png"));
    tileImages.push(loadImage("simple/down.png"));
    tileImages.push(loadImage("simple/right.png"));
    tileImages.push(loadImage("simple/left.png"));


    // Populating Matrix
    for (let i = 0; i < dim * dim; i++) {
        matrix.push({ options: [1, 2, 3, 4], idx: i })
    }


}

function draw() {
    let copyMatrix = matrix.slice()
    let tmp = copyMatrix.filter((a) => a.options.length > 1).sort((a, b) => {
        if (a.options.length > b.options.length) {
            return -1;
        }
        else {
            return 1;
        }
    })
    if (tmp.length) {
        randTile = tmp[0].options[Math.floor(Math.random() * tmp[0].options.length)]
        tmp[0].options = [randTile]
        let i = tmp[0].idx % dim;
        let j = Math.floor(tmp[0].idx / dim);
        if (i > 1) {
            if (matrix[(j) * dim + (i - 1)].options.length > 1) {
                matrix[(j) * dim + (i - 1)].options = tileConfig[randTile]["left"]
            }
        }
        if (i < (dim - 1)) {
            if (matrix[(j) * dim + (i + 1)].options.length > 1) {
                matrix[(j) * dim + (i + 1)].options = tileConfig[randTile]["right"]
            }
        }
        if (j > 1) {
            if (matrix[(j - 1) * dim + (i)].options.length > 1) {
                matrix[(j - 1) * dim + (i)].options = tileConfig[randTile]["up"]
            }
        }
        if (j < (dim - 1)) {
            if (matrix[(j + 1) * dim + (i)].options.length > 1) {
                matrix[(j + 1) * dim + (i)].options = tileConfig[randTile]["down"]
            }
        }
    }
    // Draw Matrix
    for (let i = 0; i < dim * dim; i++) {
        if (matrix[i].options.length > 1) {
            image(tileImages[0], (i % dim) * sw, Math.floor(i / dim) * sh, sw, sh);
        } else {
            image(tileImages[matrix[i].options[0]], (i % dim) * sw, Math.floor(i / dim) * sh, sw, sh);
        }
    }

    if (cutOff == 0) {

        noLoop();
    } else {
        cutOff -= 1;
    }
}