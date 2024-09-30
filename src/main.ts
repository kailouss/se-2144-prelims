let currentInput: string = '';
let previousInput: string = ''; // Stores the last answer
let storedAnswer: string = ''; // To store Ans value even after AC is pressed
let isCalculatorOn: boolean = false;
let isDisplayingHello: boolean = false; // Flag to stop hello if input occurs
let displayElement = document.querySelector('.screen_input') as HTMLElement;
let previousDisplayElement = document.querySelector('.previous_input') as HTMLElement;
let indicatorElement = document.querySelector('.status-indicator') as HTMLElement;
const maxLength: number = 16;

// Function to update the display
function updateDisplay() {
  if (!isCalculatorOn) return;
  displayElement.innerText = currentInput.slice(0, maxLength);
  previousDisplayElement.innerText = previousInput;
}

// Update the on/off status indicator
function updateIndicator() {
  indicatorElement.style.backgroundColor = isCalculatorOn ? 'green' : 'red';
}

// Clear function (AC) but keeps Ans stored
function clearAll() {
  if (!isCalculatorOn) return;
  currentInput = '';
  previousInput = '';
  displayElement.innerText = '';
  previousDisplayElement.innerText = '';
}

// Function to store answer in Ans and not remove after AC
function handleAns() {
  if (isCalculatorOn && storedAnswer !== '') {
    currentInput += storedAnswer;
    updateDisplay();
  }
}

// Handle digit input
function inputDigit(digit: string) {
  if (isCalculatorOn && !isDisplayingHello && currentInput.length < maxLength) {
    currentInput += digit;
    updateDisplay();
    isDisplayingHello = false; // Stop Hello once input starts
  }
}

// Function to handle operator input
function inputOperator(op: string) {
  if (isCalculatorOn && currentInput !== '') {
    const lastChar = currentInput[currentInput.length - 1];
    if (isOperator(lastChar)) {
      currentInput = currentInput.slice(0, -1) + ` ${op} `;
    } else {
      currentInput += ` ${op} `;
    }
    updateDisplay();
  }
}

// Helper function to check if the character is an operator
function isOperator(char: string): boolean {
  return ['+', '-', '*', '/'].includes(char);
}

// Equals button
function calculate() {
  if (isCalculatorOn && currentInput) {
    try {
      const result = eval(currentInput.replace(/x/g, '*'));
      previousInput = `${result}`;
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

// Backspace function
function backspace() {
  if (isCalculatorOn) {
    currentInput = currentInput.trim().slice(0, -1);
    updateDisplay();
  }
}

// Toggle calculator (Bye)
function toggleCalculator() {
  if (isCalculatorOn) {
    displayGoodbye();
    isCalculatorOn = false;
    updateIndicator();
  }
}

// AC button function
function handleAC() {
  if (!isCalculatorOn) {
    isCalculatorOn = true;
    // displayHello();
  }
  clearAll();
  updateIndicator();
}

// Display Goodbye animation
function displayGoodbye() {
  displayElement.innerText = 'Goodbye!';
  setTimeout(() => {
    displayElement.innerText = '';
    clearAll();

  }, 1000);
}

// Display Hello (stops once input starts)
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

// Decimal input (only allow once)
function handleDecimal() {
  if (isCalculatorOn && !currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}

document.querySelector('.hello')?.addEventListener('click', () => {
  if (isCalculatorOn) {
    displayHello(); // Call the displayHello function
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
