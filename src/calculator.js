#!/usr/bin/env node

const USAGE = 'Usage: node src/calculator.js <number> <operator> <number>';

function calculate(left, operator, right) {
  switch (operator) {
    // Addition
    case '+':
      return left + right;
    // Subtraction
    case '-':
      return left - right;
    // Multiplication
    case '*':
    case 'x':
    case '×':
      return left * right;
    // Division
    case '/':
    case '÷':
      if (right === 0) {
        throw new Error('Cannot divide by zero.');
      }
      return left / right;
    default:
      throw new Error(`Unsupported operator "${operator}". Use +, -, *, or /.`);
  }
}

function parseNumber(value, name) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`${name} must be a finite number.`);
  }

  return number;
}

function main(args) {
  if (args.length !== 3) {
    throw new Error(USAGE);
  }

  const left = parseNumber(args[0], 'The first operand');
  const right = parseNumber(args[2], 'The second operand');
  return calculate(left, args[1], right);
}

if (require.main === module) {
  try {
    console.log(main(process.argv.slice(2)));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { calculate, main };
