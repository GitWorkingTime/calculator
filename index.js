/*
 * Main functionality:
 * - add
 * - subtract
 * - multiply
 * - divide
 */
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate( operator, a, b) {
    switch(operator) {
        case '+':
            add(a, b);
            break;
        case '-':
            subtract(a, b);
            break;
        case '*':
            multiply(a, b);
            break;
        case '/':
            divide(a, b);
            break;
    }
}

// ---- DOM Manipulation ----
const calc = document.querySelector(".calc-body");
const num = document.querySelector(".numbers");
const op = document.querySelector(".operators");
for( let i = 0; i < 10; ++i ) {
    const numChild = document.createElement("button");
    numChild.textContent = i;
    numChild.setAttribute("class", `${i} num`);
    num.appendChild(numChild);
}

