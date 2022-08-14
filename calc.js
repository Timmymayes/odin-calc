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
const buttons = document.querySelectorAll(".button");
buttons.forEach((btn) => btn.addEventListener("click", executeClick));

function executeClick(e) {
  if (e.target.id === "=") {
    if (
      args.operator != undefined &&
      args.prevOperand != undefined &&
      args.operand != undefined
    ) {
      console.log(operate(args));
      args = {};
    }
  } else if (Number.isNaN(parseInt(e.target.id))) {
    if (args.operand != undefined) {
      args.prevOperand = args.operand;
    }
    args.operator = e.target.id;
    args.operand = undefined;
  } else {
    if (args.operand === undefined) {
      args.operand = e.target.id;
    } else {
      args.operand += parseInt(e.target.id);
    }
  }
  console.log("Current Operation: " + args.operator);
  console.log("Current Operand: " + args.operand);
  console.log("Previous Operand: " + args.prevOperand);
}
