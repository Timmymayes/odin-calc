const MAX_HISTORY_LENGTH = 35;
const MAX_BUFFER_LENGTH = 18;

function sum(num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
  return parseFloat(num1) - parseFloat(num2);
}

function divide(num1, num2) {
  if (num2 === "0") {
    return "Zero, cool!";
  }
  return parseFloat(num1) / parseFloat(num2);
}

function multiply(num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
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
clearButtons();
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
    clearHistory();
    clearButtons();
    args = {};
  } else if (e.target.id === "BCK") {
    // backspace
    if (args.operand != undefined) {
      args.operand = args.operand.slice(0, args.operand.length - 1);

      clearBuffer();
      appendBuffer(args.operand);
    }
  } else if (Number.isNaN(parseFloat(e.target.id)) && e.target.id != ".") {
    // operators
    // clear buttons if operator is pressed first.

    if (args.operand === undefined && args.prevOperand === undefined) {
      clearButtons();
      clearBuffer();
    }
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
    if (buffer.textContent != "Zero, cool!") {
      args.prevOperator = args.operator;
      args.operator = e.target.id;
      clearButtons();
      console.log("button is " + e.target.id);
      e.target.style.background = "#cc3300";
    } else {
      clearBuffer();
      clearButtons();
      clearHistory();
      args = {};
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
      if (!args.operand.includes(".") || e.target.id != ".") {
        appendBuffer(e.target.id);
        args.operand += e.target.id;
      }
    }
  }

  console.log("Current Operation: " + args.operator);
  console.log("Current Operand: " + args.operand);
  console.log("Previous Operand: " + args.prevOperand);
}

function calculate(equation) {
  console.log("Calculating...");
  let answer;
  let answerString;
  clearHistory();
  appendHistory(equation.prevOperand + equation.operator + args.operand);
  clearBuffer();
  answer = operate(equation);
  answerString = Number.toString("Answer");

  if (answerString.length > MAX_BUFFER_LENGTH) {
    console.log("too long");
    if (!answerString.includes(".")) {
      answerString = "OVERFLOW";
    } else {
      answerString = parseFloat(answer).toFixed(18 - answer.indexOf("."));
      console.log("Answer Rounded");
    }
  }

  appendBuffer(answer);
  console.log(buffer.textContent);

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
  document.getElementById("-").style.background = "orange";
  document.getElementById("*").style.background = "orange";
  document.getElementById("/").style.background = "orange";
  document.getElementById("+").style.background = "orange";
}
