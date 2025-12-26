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
    let result = 0;
    switch(operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }
    return result;
}

// ---- DOM Manipulation ----
const num = document.querySelector(".numbers");
for( let i = 0; i < 10; ++i ) {
    const numChild = document.createElement("button");
    numChild.textContent = i;
    numChild.setAttribute("class", `num ${i}`);
    num.appendChild(numChild);
}

const btns = document.querySelector(".buttons");
const equation = document.querySelector(".equation");
const result = document.querySelector(".result");
let numStr = "";

function clearScreen(){
    equation.textContent = "";
    result.textContent = "";
}


btns.addEventListener("click", (evt) => {
    let numericals = "0123456789";
    let el = evt.target.className;

    // Add digits to the screen
    if(el.includes("num")) {
        let val = el
            .split('')
            .filter(char => numericals.includes(char))
            .join('');
        
        if( numStr.length == 0 && val == "0") {
            return;
        }

        if(result.textContent != "") {
            clearScreen();
        }
        
        numStr += val;
        equation.textContent += val;
    }

    // Add the operator to the screen
    if(el.includes("ops")) {
        let val = el.replace("ops ", "");
        numStr = "";
        switch(val) {
            case "addition":
                equation.textContent += " + ";
                break;
            case "subtraction":
                equation.textContent += " - ";
                break;
            case "multiplication":
                equation.textContent += " * ";
                break;
            case "division":
                equation.textContent += " / ";
                break;
            case "equate":
                break;
        }
    }

    if(el.includes("clear")){
        clearScreen();
    }

    if(el.includes("equate")){
        let eqStr = equation.textContent;
        let parsed = "";
        let eq = [];

        // Seperate the values and operators into an array
        for( let i = 0; i < eqStr.length; ++i ) {
            if(eqStr[i] == " ") {
                eq[eq.length] = parsed;
                parsed = "";
                continue;
            }

            parsed += eqStr[i];
        }
        eq[eq.length] = parsed;
        parsed = "";

        // Convert strings with numbers into actual number data types
        for( let i = 0; i < eq.length; ++i ) {
            if(eq[i] == '+' || eq[i] == '-' || eq[i] == '/' || eq[i] == '*') {
                continue;
            }
            eq[i] = +eq[i];
        }

        let countMultiDiv = 0;
        for( let i = 0; i < eq.length; ++i ) {
            if(eq[i] == '*' || eq[i] == '/') {
                ++countMultiDiv;
            }
        }
        
        for( let j = 0; j < countMultiDiv; ++j ) {
            for( let i = 0; i < eq.length; ++i ) {
                if(eq[i] == '*' || eq[i] == '/') {
                    let result = operate(eq[i], eq[i - 1], eq[i + 1]);
                    eq.splice(i - 1, 3, result);
                }
            }
        }

        let i = 0;
        while( eq.length != 1 ) {
            if(eq[i] == '-' || eq[i] == '+') {
                let result = operate(eq[i], eq[i - 1], eq[i + 1]);
                eq.splice(i - 1, 3, result);
            }
            ++i;
        }

        result.textContent = eq[0];
    }

});

