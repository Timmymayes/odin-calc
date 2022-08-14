const MAX_HISTORY_LENGTH = 35;
const MAX_BUFFER_LENGTH = 20;

function sum(num1, num2) {
  return num1 + num2;
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

function operate(num1, num2, operator) {
  let result;
  switch (operator) {
    case "+":
      result = sum(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
  }
  return result;
}

const buttons = document.querySelectorAll(".button");
buttons.forEach((btn) => btn.addEventListener("click", executeClick));

function executeClick(e) {
  let operator = "";
  let operand = 0;
  if (e.target.id === "=") {
    console.log("run operate function");
  } else if (Number.isNaN(parseInt(e.target.id))) {
    operator = e.target.id;
  } else {
    operand = e.target.id;
  }
  console.log("Current Operation: " + operator);
  console.log("Current Operand: " + operand);
}
