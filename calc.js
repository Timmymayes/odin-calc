const MAX_HISTORY_LENGTH = 35;
const MAX_BUFFER_LENGTH = 18;

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

const buffer = document.getElementById("buffer-text");
const history = document.getElementById("history-text");
const buttons = document.querySelectorAll(".button");

buttons.forEach((btn) => btn.addEventListener("click", executeClick));

function executeClick(e) {
  let calculation;

  if (e.target.id === "=") {
    // Equals case
    if (
      args.operator != undefined &&
      args.prevOperand != undefined &&
      args.operand != undefined
    ) {
      let solution = calculate(args);
      args = {};
      args.prevOperand = solution;
      clearButtons();
    }
  } else if (e.target.id === "CLR") {
    // Clear
    clearBuffer();
    clearButtons();
    args = {};
  } else if (e.target.id === "AC") {
    // all clear
    clearHistory();
    clearBuffer();
    clearButtons();
    args = {};
  } else if (Number.isNaN(parseInt(e.target.id))) {
    // operators

    // if we have an ope
    if (args.operand != undefined && args.prevOperand != undefined) {
      let solution = calculate(args);
      args = {};
      args.prevOperand = solution;
      clearButtons();
      args.isCalculating = true;
    }

    // first calculation in a chain
    if (!args.isCalculating) {
      args.prevOperand = args.operand;
      args.operand = undefined;
      args.isCalculating;
    }

    // set operator & highlighting
    args.prevOperator = args.operator;
    args.operator = e.target.id;
    clearButtons();
    e.target.style.background = "grey";

    // clear buttons if operator is pressed first.
    if (args.operand === undefined && args.prevOperand === undefined) {
      clearButtons();
      clearBuffer();
    }
  } else {
    //Numbers

    //build the operand

    if (args.isCalculating) {
      clearBuffer();
      args.isCalculating = false;
    }

    if (args.operand === undefined) {
      args.operand = e.target.id;
      if (buffer.textContent != "") {
        clearBuffer();
      }
      appendBuffer(e.target.id);
    } else {
      appendBuffer(e.target.id);
      args.operand += parseInt(e.target.id);
    }
  }

  console.log("Current Operation: " + args.operator);
  console.log("Current Operand: " + args.operand);
  console.log("Previous Operand: " + args.prevOperand);
}

function calculate(equation) {
  console.log("Calculating...");
  let answer;
  clearHistory();
  appendHistory(equation.prevOperand + equation.operator + args.operand);
  clearBuffer();
  answer = operate(equation);
  if (answer.length > MAX_BUFFER_LENGTH) {
    if (!answer.includes(".")) {
      answer = "OVERFLOW";
    } else {
      answer = parseFloat(answer).toFixed(18 - answer.indexOf("."));
      console.log("Answer Rounded");
    }
  }
  appendBuffer(answer);

  return answer;
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

function clearButtons() {
  document.getElementById("-").style.background = "lightgrey";
  document.getElementById("*").style.background = "lightgrey";
  document.getElementById("/").style.background = "lightgrey";
  document.getElementById("+").style.background = "lightgrey";
}
