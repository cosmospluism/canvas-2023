const fontRange = document.querySelector(".font-range");
const text = document.getElementById("text");

fontRange.addEventListener("change", onFontSizeChange);

function onFontSizeChange(event) {
    //수정 필요 
    const selectSize = event.target.value;
    const textSize = text.size;
    textSize = selectSize;
    console.log(textSize);
};

