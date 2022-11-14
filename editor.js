const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = canvas.clientWidth;
ctx.canvas.height = canvas.clientHeight;

const btnErase = document.getElementById("btn-erase");
const slidebar = document.getElementById("slidebar");
const colorPicker = document.getElementById("color-picker");
const btnLine = document.getElementById("btn-line");
const btnCircle = document.getElementById("btn-circle");
const btnFree = document.getElementById("btn-wave");

let mode = "";
let touches = [];


function start(e) {
    e.preventDefault();

    const touch = e.touches[0];
    touches.push(touch);

    switch (mode) {
        case "LINE":
            break;

        case "CIRCLE":
            break;

        case "FREE":
            const pos = calculatePosition(touch);

            ctx.beginPath();
            ctx.lineWidth = slidebar.value;
            ctx.strokeStyle = colorPicker.value;
            ctx.moveTo(pos.x, pos.y);
            break;

        default:
            break;
    }
}

function move(e) {
    e.preventDefault();

    const touch = e.touches[0];
    touches.push(touch);

    switch (mode) {
        case "LINE":
            break;

        case "CIRCLE":
            break;

        case "FREE":
            const pos = calculatePosition(touch);

            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            break;

        default:
            break;
    }
}

function end(e) {
    e.preventDefault();

    const startPos = calculatePosition(touches[0]);
    const endPos = calculatePosition(touches[touches.length - 1]);

    switch (mode) {
        case "LINE":
            ctx.beginPath();
            ctx.lineWidth = slidebar.value;
            ctx.strokeStyle = colorPicker.value;
            ctx.moveTo(startPos.x, startPos.y);
            ctx.lineTo(endPos.x, endPos.y);
            ctx.stroke();
            ctx.closePath();
            break;

        case "CIRCLE":
            x = (startPos.x + endPos.x) / 2;
            y = (startPos.y + endPos.y) / 2;
            r = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2)) / 2;

            ctx.beginPath();
            ctx.lineWidth = slidebar.value;
            ctx.strokeStyle = colorPicker.value;
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            break;

        case "FREE":
            ctx.closePath();
            break;

        default:
            break;
    }

    clearTouches();
}

function calculatePosition(o) {
    return {x: o.clientX - canvas.getBoundingClientRect().left, y: o.clientY - canvas.getBoundingClientRect().top};
}

function clearTouches() {
    touches = [];
}


btnErase.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

btnLine.addEventListener("click", () => {
    mode = "LINE";
});

btnCircle.addEventListener("click", () => {
    mode = "CIRCLE";
});

btnFree.addEventListener("click", () => {
    mode = "FREE";
});

canvas.addEventListener("touchstart", start);
canvas.addEventListener("touchmove", move);
canvas.addEventListener("touchend", end);