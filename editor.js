const mainCanvas = document.getElementById("main-canvas");
const mainCtx = mainCanvas.getContext("2d");
mainCtx.canvas.width = mainCanvas.clientWidth;
mainCtx.canvas.height = mainCanvas.clientHeight;

const subCanvas = document.getElementById("sub-canvas");
subCanvas.style.top = 0;

const subCtx = subCanvas.getContext("2d");
subCtx.canvas.width = subCanvas.clientWidth;
subCtx.canvas.height = subCanvas.clientHeight;

const eraseButton = document.getElementById("btn-erase");
const slidebar = document.getElementById("slidebar");
const colorPicker = document.getElementById("color-picker");
const lineButton = document.getElementById("btn-line");
const circleButton = document.getElementById("btn-circle");
const freeButton = document.getElementById("btn-free");

let mode = "";

let mainHistory = [];
let subHistory = {};
let touches = [];


function subStart(e) {
    e.preventDefault();

    const touch = e.touches[0];

    switch (mode) {
        case "LINE":
            break;

        case "CIRCLE":
            break;

        case "FREE":
            const pos = calculatePosition(touch);

            subCtx.beginPath();
            subCtx.lineWidth = slidebar.value;
            subCtx.strokeStyle = colorPicker.value;
            subCtx.moveTo(pos.x, pos.y);
            break;

        default:
            break;
    }
}

function subMove(e) {
    e.preventDefault();

    const touch = e.touches[0];

    switch (mode) {
        case "LINE":
            break;

        case "CIRCLE":
            break;

        case "FREE":
            const pos = calculatePosition(touch);
            touches.push(pos);

            subCtx.lineTo(pos.x, pos.y);
            subCtx.stroke();
            break;

        default:
            break;
    }
}

function subEnd(e) {
    e.preventDefault();

    switch (mode) {
        case "LINE":
            break;

        case "CIRCLE":
            break;

        case "FREE":
            break;

        default:
            subCtx.closePath();
            break;
    }

    subHistory = {
        touches: touches, 
        color: colorPicker.value, 
        weight: slidebar.value
    };

    touches = [];

    redrawToMainCanvas();
}

function calculatePosition(o) {
    return {x: o.clientX - mainCanvas.getBoundingClientRect().left, y: o.clientY - mainCanvas.getBoundingClientRect().top};
}

function redrawToMainCanvas() {
    subCtx.clearRect(0, 0, subCanvas.width, subCanvas.height);

    mainCtx.beginPath();
    mainCtx.strokeStyle = subHistory.color;
    mainCtx.lineWidth = subHistory.weight;
    mainCtx.moveTo(subHistory.touches[0].x, subHistory.touches[0].y);

    for (let i = 1; i < subHistory.touches.length; i++) {
        mainCtx.lineTo(subHistory.touches[i].x, subHistory.touches[i].y);
    }

    mainCtx.stroke();
    mainCtx.closePath();

    mainHistory.push(subHistory);
}

function reDrawMainCanvas() {
    if (mainHistory.length > 0) {
        mainHistory.pop();
    }

    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

    for (let i = 0; i < mainHistory.length; i++) {
        mainCtx.beginPath();
        mainCtx.strokeStyle = mainHistory[i].color;
        mainCtx.lineWidth = mainHistory[i].weight;

        for (let j = 0; j < mainHistory[i].touches.length; j++) {
            if (j == 0) {
                mainCtx.moveTo(mainHistory[i].touches[j].x, mainHistory[i].touches[j].y);

            } else {
                mainCtx.lineTo(mainHistory[i].touches[j].x, mainHistory[i].touches[j].y);
            }
        }

        mainCtx.stroke();
        mainCtx.closePath();
    }
}


eraseButton.addEventListener("click", reDrawMainCanvas);

lineButton.addEventListener("click", () => {
    mode = "LINE";
});

circleButton.addEventListener("click", () => {
    mode = "CIRCLE";
});

freeButton.addEventListener("click", () => {
    mode = "FREE";
});

subCanvas.addEventListener("touchstart", subStart);
subCanvas.addEventListener("touchmove", subMove);
subCanvas.addEventListener("touchend", subEnd);