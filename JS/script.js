javascript

const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;
let resultCalculated = false;

function updateDisplay() {
    display.textContent = currentOperand || '0';
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    resultCalculated = false;
    updateDisplay();
}

function appendNumber(number) {
    if (resultCalculated) {
        currentOperand = '';
        resultCalculated = false;
    }

    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    currentOperand = result.toString();
    operation = undefined;
    previousOperand = '';
    resultCalculated = true;
    updateDisplay();
}

buttons.addEventListener('click', e => {
    const button = e.target;
    const value = button.dataset.value;

    if (value) {
        if (button.classList.contains('btn-dark') || value === '.') {
            appendNumber(value);
        } else if (button.classList.contains('btn-orange')) {
            if (value === '=') {
                calculate();
            } else {
                chooseOperation(value);
            }
        } else if (value === 'clear') {
            clear();
        } else if (value === 'backspace') {
            backspace();
        } else if (value === '%') {
             chooseOperation(value);
        }
    }
});