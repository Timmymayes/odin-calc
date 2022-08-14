const MAX_HISTORY_LENGTH = 35;
const MAX_BUFFER_LENGTH = 20;

function sum(num1, num2) {
  return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2) {
  return num1 - num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "ERROR";
  }
  return num1 / num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function operate(calculation) {
  let result;
  switch (calculation.operator) {
    case "+":
      result = sum(calculation.operand, calculation.prevOperand);
      break;
    case "-":
      result = subtract(calculation.prevOperand, calculation.operand);
      break;
    case "/":
      result = divide(calculation.prevOperand, calculation.operand);
      break;
    case "*":
      result = multiply(calculation.operand, calculation.prevOperand);
      break;
  }
  return result;
}

let args = {};
let needsCleared = false;
const buffer = document.getElementById("buffer-text");
const history = document.getElementById("history-text");
const buttons = document.querySelectorAll(".button");
buttons.forEach((btn) => btn.addEventListener("click", executeClick));

function executeClick(e) {
  let calculation;
  if (e.target.id === "=") {
    if (
      args.operator != undefined &&
      args.prevOperand != undefined &&
      args.operand != undefined
    ) {
      clearHistory();
      appendHistory(args.prevOperand + args.operator + args.operand);
      clearBuffer();
      calculation = operate(args);
      appendBuffer(calculation);
      needsCleared = true;
      args = {};
      args.prevOperand = calculation;
    }
  } else if (e.target.id === "CLR") {
    args.operand = undefined;
    args.operator = undefined;
    clearBuffer();
    if (args.prevOperand) {
      appendBuffer(args.prevOperand);
    }
  } else if (e.target.id === "AC") {
    console.log("made it into all clear");
    clearHistory();
    clearBuffer();
    args.operand = undefined;
    args.operator = undefined;
    args.prevOperand = undefined;
  } else if (Number.isNaN(parseInt(e.target.id))) {
    console.log("made it into operators");
    if (args.operand != undefined) {
      args.prevOperand = args.operand;
    }
    if (args.operator === undefined) {
      appendBuffer(e.target.id);
      args.operator = e.target.id;
      args.operand = undefined;
      needsCleared = false;
    }
  } else {
    console.log("made it into numbers");
    if (needsCleared) {
      clearBuffer();
      calculation = null;
    }
    if (args.operand === undefined) {
      args.operand = e.target.id;
      appendBuffer(e.target.id);
    } else {
      if (args.operand.length < MAX_BUFFER_LENGTH) {
        appendBuffer(e.target.id);
        args.operand += parseInt(e.target.id);
      }
    }
  }
  console.log("Current Operation: " + args.operator);
  console.log("Current Operand: " + args.operand);
  console.log("Previous Operand: " + args.prevOperand);
}

function appendBuffer(textToDisplay) {
  buffer.textContent += textToDisplay;
}

function clearBuffer() {
  buffer.textContent = "";
}

function clearHistory() {
  history.textContent = "";
}

function appendHistory(textToAppend) {
  history.textContent += textToAppend;
}
