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
