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
    const pos = calculatePosition(touch);

    switch (mode) {
        case "LINE":
            touches.push(pos);
            break;

        case "CIRCLE":
            touches.push(pos);
            break;

        case "FREE":
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
    const pos = calculatePosition(touch);

    switch (mode) {
        case "LINE":
            if (touches.length > 1) {
                touches.pop();
                touches.push(pos);

            } else {
                touches.push(pos);
            }

            drawLine();
            break;

        case "CIRCLE":
            if (touches.length > 1) {
                touches.pop();
                touches.push(pos);

            } else {
                touches.push(pos);
            }

            drawCircle();
            break;

        case "FREE":
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

    subCtx.closePath();

    subHistory = {
        touches: touches, 
        type: mode,
        color: colorPicker.value, 
        weight: slidebar.value
    };

    touches = [];

    if (mode !== "") {
        redrawToMainCanvas();

        mainHistory.push(subHistory);
    }
}

function calculatePosition(o) {
    return {x: o.clientX - mainCanvas.getBoundingClientRect().left, y: o.clientY - mainCanvas.getBoundingClientRect().top};
}

function redrawToMainCanvas() {
    if (mode === "") {
        return;
    }
    
    subCtx.clearRect(0, 0, subCanvas.width, subCanvas.height);

    mainCtx.beginPath();
    mainCtx.strokeStyle = subHistory.color;
    mainCtx.lineWidth = subHistory.weight;

    switch (mode) {
        case "LINE":
            mainCtx.moveTo(subHistory.touches[0].x, subHistory.touches[0].y);
            mainCtx.lineTo(subHistory.touches[1].x, subHistory.touches[1].y);
            break;

        case "CIRCLE":
            s = {
                x: (subHistory.touches[0].x + subHistory.touches[1].x) / 2,
                y: (subHistory.touches[0].y + subHistory.touches[1].y) / 2,
                r: Math.sqrt(Math.pow(subHistory.touches[1].x - subHistory.touches[0].x, 2) + Math.pow(subHistory.touches[1].y - subHistory.touches[0].y, 2)) / 2
            };

            mainCtx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
            break;

        case "FREE":
            mainCtx.moveTo(subHistory.touches[0].x, subHistory.touches[0].y);
            for (let i = 1; i < subHistory.touches.length; i++) {
                mainCtx.lineTo(subHistory.touches[i].x, subHistory.touches[i].y);
            }
            break;

        default:
            break;
    }

    mainCtx.stroke();
    mainCtx.closePath();
}

function reDrawMainCanvas() {
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

    for (let i = 0; i < mainHistory.length; i++) {
        mainCtx.beginPath();
        mainCtx.strokeStyle = mainHistory[i].color;
        mainCtx.lineWidth = mainHistory[i].weight;

        switch (mainHistory[i].type) {
            case "LINE":
                mainCtx.moveTo(mainHistory[i].touches[0].x, mainHistory[i].touches[0].y);
                mainCtx.lineTo(mainHistory[i].touches[1].x, mainHistory[i].touches[1].y);
                break;

            case "CIRCLE":
                s = {
                    x: (mainHistory[i].touches[0].x + mainHistory[i].touches[1].x) / 2,
                    y: (mainHistory[i].touches[0].y + mainHistory[i].touches[1].y) / 2,
                    r: Math.sqrt(Math.pow(mainHistory[i].touches[1].x - mainHistory[i].touches[0].x, 2) + Math.pow(mainHistory[i].touches[1].y - mainHistory[i].touches[0].y, 2)) / 2
                };

                mainCtx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
                break;

            case "FREE":
                for (let j = 0; j < mainHistory[i].touches.length; j++) {
                    if (j == 0) {
                        mainCtx.moveTo(mainHistory[i].touches[j].x, mainHistory[i].touches[j].y);
        
                    } else {
                        mainCtx.lineTo(mainHistory[i].touches[j].x, mainHistory[i].touches[j].y);
                    }
                }
                break;

            default:
                break;
        }

        mainCtx.stroke();
        mainCtx.closePath();
    }
}

function drawLine() {
    subCtx.clearRect(0, 0, subCanvas.width, subCanvas.height);
    subCtx.beginPath();
    subCtx.lineWidth = slidebar.value;
    subCtx.strokeStyle = colorPicker.value;
    subCtx.moveTo(touches[0].x, touches[0].y);
    subCtx.lineTo(touches[1].x, touches[1].y);
    subCtx.stroke();
    subCtx.closePath();
}

function drawCircle() {
    s = {
        x: (touches[0].x + touches[1].x) / 2,
        y: (touches[0].y + touches[1].y) / 2,
        r: Math.sqrt(Math.pow(touches[1].x - touches[0].x, 2) + Math.pow(touches[1].y - touches[0].y, 2)) / 2
    };

    subCtx.clearRect(0, 0, subCanvas.width, subCanvas.height);
    subCtx.beginPath();
    subCtx.lineWidth = slidebar.value;
    subCtx.strokeStyle = colorPicker.value;
    subCtx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    subCtx.stroke();
    subCtx.closePath();
}

function removeLastElement() {
    mode = "";

    if (mainHistory.length > 0) {
        mainHistory.pop();
    }
}


eraseButton.addEventListener("click", () => {
    removeLastElement();
    reDrawMainCanvas();
});

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

reDrawMainCanvas();