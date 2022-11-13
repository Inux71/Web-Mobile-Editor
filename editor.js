const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = canvas.clientWidth;
ctx.canvas.height = canvas.clientHeight;

const btnErase = document.getElementById("btn-erase");
const slidebar = document.getElementById("slidebar");
const colorPicker = document.getElementById("color-picker");
const btnLine = document.getElementById("btn-line");
const btnCircle = document.getElementById("btn-circle");
const btnWave = document.getElementById("btn-wave");

let mode = "";


function start(e) {
    e.preventDefault();

    const touch = e.touches[0];
    const color = colorPicker.value;
    const weight = slidebar.value;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = weight;

    switch (mode) {
        case "LINE":
            break;

        case "CIRCLE":
            break;

        case "FREE":
            ctx.moveTo(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
            break;

        default:
            break;
    }
}

function end(e) {
    e.preventDefault();

    switch (mode) {
        case "LINE":
            break;

        case "CIRCLE":
            break;

        case "FREE":
            break;

        default:
            break;
    }

    ctx.closePath();
}

function cancel(e) {
    e.preventDefault();

    switch (mode) {
        case "LINE":
            break;

        case "CIRCLE":
            break;

        case "FREE":
            break;

        default:
            break;
    }
}

function move(e) {
    e.preventDefault();

    const touch = e.touches[0];

    switch (mode) {
        case "LINE":
            break;

        case "CIRCLE":
            break;

        case "FREE":
            ctx.lineTo(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
            ctx.stroke();

            break;

        default:
            break;
    }
}


btnLine.addEventListener("click", () => {
    mode = "LINE";
});

btnCircle.addEventListener("click", () => {
    mode = "CIRCLE";
});

btnWave.addEventListener("click", () => {
    mode = "FREE";
});

canvas.addEventListener("touchstart", start);
canvas.addEventListener("touchend", end);
canvas.addEventListener("touchcancel", cancel);
canvas.addEventListener("touchmove", move);