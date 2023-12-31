const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const lineWidth = document.getElementById("line-width");
const changeColor = document.getElementById("color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");

canvas.width = 800;
canvas.height = 600;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", onLineWidthChange);
changeColor.addEventListener("change", onChangeColor);
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

function onDoubleClick(event) {
    const writtenText = textInput.value;
    if(writtenText !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "50px sans-serif";
        ctx.fillText(writtenText, event.offsetX, event.offsetY);
        ctx.restore();    
    }
}
 
function onFileChange(event) {
    const file = event.target.files[0];
    console.dir(event.target);
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, 800, 600);
        fileInput.value = null;
    }
}

function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onDestroyClick() {
    ctx.clearRect(0,0,800,600);
}

function onCanvasClick() {
    if(isFilling){
       ctx.fillRect(0,0,800,600);
    }   
}

function onModeClick() {
    if(isFilling) {
        isFilling = false;
        modeBtn.innerText = "🤍Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "💜Draw";
    }
}
 
function onChangeColor(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value
}

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown() {
    isPainting = true;
}

function onMouseUp() {
    isPainting = false;
}

colorOption.forEach((item) => item.addEventListener("click", getColorCode));

function getColorCode(event) {
    ctx.strokeStyle = event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    changeColor.value = event.target.dataset.color;
}