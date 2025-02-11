const calculator = document.querySelector('.calculator');
const previousOperand = document.querySelector('.previous');
const currentOperand = document.querySelector('.current');
let currentValue = '0';
let previousValue = '';
let operation = null;

calculator.addEventListener('click', e => {
    if (e.target === calculator) return;
    
    const button = e.target;
    button.classList.add('pop');
    
    setTimeout(() => {
        button.classList.remove('pop');
    }, 300);

    if (button.classList.contains('ac')) {
        clear();
    } else if (button.classList.contains('delete')) {
        deleteNumber();
    } else if (button.classList.contains('operation')) {
        chooseOperation(button.dataset.operation);
    } else if (button.classList.contains('equals')) {
        compute();
    } else if (button.dataset.number) {
        appendNumber(button.dataset.number);
    }

    updateDisplay();
});

function appendNumber(number) {
    if (number === '.' && currentValue.includes('.')) return;
    if (currentValue === '0' && number !== '.') {
        currentValue = number;
    } else {
        currentValue += number;
    }
}

function chooseOperation(op) {
    if (currentValue === '') return;
    if (previousValue !== '') {
        compute();
    }
    operation = op;
    previousValue = currentValue;
    currentValue = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        default:
            return;
    }

    currentValue = computation.toString();
    operation = null;
    previousValue = '';
}

function clear() {
    currentValue = '0';
    previousValue = '';
    operation = null;
}

function deleteNumber() {
    currentValue = currentValue.slice(0, -1);
    if (currentValue === '') currentValue = '0';
}

function updateDisplay() {
    currentOperand.textContent = currentValue;
    if (operation) {
        previousOperand.textContent = `${previousValue} ${operation}`;
    } else {
        previousOperand.textContent = '';
    }
}