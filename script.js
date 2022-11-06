const nonBinaryChars = /[^0-1]/;
const nonDecimalChars = /[^\d]/;

const MAX_DECIMAL_INPUT = (Math.pow(2, 32) - 1);

const binInput = document.getElementById("binary-input");
const binResultSpan = document.getElementById("binary-result-span");

const decInput = document.getElementById("decimal-input");
const decResultSpan = document.getElementById("decimal-result-span");


binInput.addEventListener("input", function() {
    if (this.value == "") {
        binResultSpan.classList.remove("has-text-danger")
        binResultSpan.innerText = "";
        return;
    }

    if (!isBinary(this.value)) {
        binResultSpan.classList.add("has-text-danger")
        binResultSpan.innerText = "Not a binary input";
        return;
    } 

    binResultSpan.classList.remove("has-text-danger")
    binResultSpan.innerText = binaryToDecimal(this.value);
});

decInput.addEventListener("input", function() {
    if (this.value == "") {
        decResultSpan.classList.remove("has-text-danger")
        decResultSpan.innerText = "";
        return;
    }

    if (!isDecimal(this.value)) {
        decResultSpan.classList.add("has-text-danger")
        decResultSpan.innerText = "Not a decimal input";
        return;
    }

    if (this.value > MAX_DECIMAL_INPUT) {
        decResultSpan.classList.add("has-text-danger")
        decResultSpan.innerText = "Decimal exceeds 32-bit limit";
        return;
    }

    decResultSpan.classList.remove("has-text-danger")
    decResultSpan.innerText = decimalToBinary(this.value);
});

function isBinary(inputString) {
    if (inputString.length == 0) {return false} 
    return !nonBinaryChars.test(inputString);
}

function isDecimal(inputString) {
    if (inputString.length == 0) {return false} 
    return !nonDecimalChars.test(inputString);
}

function binaryToDecimal(binaryString) {
    let returnElement = 0;

    for (const element of binaryString) {
        returnElement = (returnElement * 2) + (element == "1" ? 1 : 0);
    }

    return returnElement;
}

function decimalToBinary(decimalString) {
    if (decimalString == 0) {return 0}

    let returnString = "";
    let iterateDecimal = parseInt(decimalString);

    while (iterateDecimal > 0) {
        returnString += (iterateDecimal % 2).toString();
        iterateDecimal = Math.floor(iterateDecimal / 2);
    }

    return returnString;
}