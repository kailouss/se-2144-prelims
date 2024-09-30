let currentInput: string = '';
let previousInput: string = ''; // This is where the answer is being input
let storedAnswer: string = ''; // This is where the previous_input is being stored
let isCalculatorOn: boolean = false;
let isDisplayingHello: boolean = false;
let displayElement = document.querySelector('.screen_input') as HTMLElement;
let previousDisplayElement = document.querySelector('.previous_input') as HTMLElement;
let indicatorElement = document.querySelector('.status-indicator') as HTMLElement;

const maxTotalLength: number = 16;
const maxInputLength: number = 8;

function updateDisplay() {
  if (!isCalculatorOn) return;
  
  let formattedInput = currentInput.replace(/\s/g, '');
  if (formattedInput.length > maxTotalLength) {
    formattedInput = formattedInput.slice(0, maxTotalLength);
  }
  
  displayElement.innerText = formattedInput;
  previousDisplayElement.innerText = previousInput;
}

function updateIndicator() {
  indicatorElement.style.backgroundColor = isCalculatorOn ? 'green' : 'red';
}

function clearAll() {
  if (!isCalculatorOn) return;
  previousInput = '';
  currentInput = '';
  displayElement.innerText = '';
  previousDisplayElement.innerText = '';
}

function handleAns() {
  if (isCalculatorOn && storedAnswer !== '') {
    currentInput += storedAnswer;
    updateDisplay();
  }
}

function inputDigit(digit: string) {
  if (isCalculatorOn && currentInput.replace(/\s/g, '').length < maxTotalLength) {
    const lastValue = currentInput.split(/([+\-*/])/).pop() || '';
    if (lastValue.length < maxInputLength) {
      currentInput += digit;
      updateDisplay();
      isDisplayingHello = false;
    }
  }
}

function inputOperator(op: string) {
  if (isCalculatorOn && currentInput !== '') {
    const lastChar = currentInput.trim().slice(-1);
    if (!isOperator(lastChar)) {
      currentInput += ` ${op} `;
      updateDisplay();
    }
  }
}

function isOperator(char: string): boolean {
  return ['+', '-', '*', '/'].includes(char);
}

function calculate() {
  if (isCalculatorOn && currentInput) {
    try {
      const result = eval(currentInput.replace(/x/g, '*'));
      previousInput = `${result}`.slice(0, maxInputLength);
      storedAnswer = previousInput;
      currentInput = '';
      updateDisplay();
    } catch (e) {
      currentInput = 'Error';
      updateDisplay();
      currentInput = '';
    }
  }
}

function backspace() {
  if (isCalculatorOn) {
    currentInput = currentInput.trim().slice(0, -1);
    updateDisplay();
  }
}

function toggleCalculator() {
  if (isCalculatorOn) {
    displayGoodbye();
    isCalculatorOn = false;
    updateIndicator();
  }
}

function handleAC() {
  if (!isCalculatorOn) {
    isCalculatorOn = true;
  }
  clearAll();
  updateIndicator();
}

function displayGoodbye() {
  previousInput = '';
  displayElement.innerText = 'Goodbye!';
  setTimeout(() => {
    previousDisplayElement.style.color = '#222'
    displayElement.innerText = '';
    clearAll();
  }, 1000);
}

function displayHello() {
  if (!isDisplayingHello) {
    const hellos = ['Hello!', 'Hola!', 'Kamusta!', 'Bonjour!', 'Hallo!', 'Ciao!'];
    const randomHello = hellos[Math.floor(Math.random() * hellos.length)];
    displayElement.innerText = randomHello;
    isDisplayingHello = true;
    setTimeout(() => {
      isDisplayingHello = false;
      updateDisplay();
    }, 2000);
  }
}

function handleDecimal() {
  if (isCalculatorOn) {
    const lastValue = currentInput.split(/([+\-*/])/).pop() || '';
    if (lastValue.length < maxInputLength && !lastValue.includes('.')) {
      currentInput += '.';
      updateDisplay();
    }
  }
}

document.querySelector('.hello')?.addEventListener('click', () => {
  if (isCalculatorOn) {
    displayHello();
  }
});

document.querySelectorAll('.digit').forEach(button => {
  button.addEventListener('click', () => inputDigit(button.innerHTML));
});

document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => inputOperator(button.innerHTML));
});

document.querySelector('.equals')?.addEventListener('click', calculate);
document.querySelector('.backspace')?.addEventListener('click', backspace);
document.querySelector('.ac')?.addEventListener('click', handleAC);
document.querySelector('.on-off')?.addEventListener('click', toggleCalculator);
document.querySelector('.ans')?.addEventListener('click', handleAns);
document.querySelector('.decimal')?.addEventListener('click', handleDecimal);
