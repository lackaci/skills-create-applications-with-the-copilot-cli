const {
  calculate,
  main,
  modulo,
  power,
  squareRoot,
} = require('../calculator');

describe('calculate', () => {
  describe('addition', () => {
    test('adds the example operands', () => {
      expect(calculate(2, '+', 3)).toBe(5);
    });

    test('supports negative and decimal operands', () => {
      expect(calculate(-2.5, '+', 3.25)).toBeCloseTo(0.75);
    });
  });

  describe('subtraction', () => {
    test('subtracts the example operands', () => {
      expect(calculate(10, '-', 4)).toBe(6);
    });

    test('supports a negative result', () => {
      expect(calculate(4, '-', 10)).toBe(-6);
    });
  });

  describe('multiplication', () => {
    test('multiplies the example operands', () => {
      expect(calculate(45, '*', 2)).toBe(90);
    });

    test('supports the calculator multiplication symbols', () => {
      expect(calculate(3, 'x', 4)).toBe(12);
      expect(calculate(3, '×', 4)).toBe(12);
    });
  });

  describe('division', () => {
    test('divides the example operands', () => {
      expect(calculate(20, '/', 5)).toBe(4);
    });

    test('supports the calculator division symbol', () => {
      expect(calculate(20, '÷', 5)).toBe(4);
    });

    test('returns a decimal result when needed', () => {
      expect(calculate(1, '/', 4)).toBe(0.25);
    });

    test('rejects division by zero', () => {
      expect(() => calculate(1, '/', 0)).toThrow('Cannot divide by zero.');
    });
  });

  describe('modulo', () => {
    test('returns the remainder from the example operation', () => {
      expect(modulo(5, 2)).toBe(1);
      expect(calculate(5, '%', 2)).toBe(1);
    });

    test('supports negative operands and exact divisions', () => {
      expect(modulo(-5, 2)).toBe(-1);
      expect(modulo(8, 2)).toBe(0);
    });

    test('rejects modulo by zero', () => {
      expect(() => modulo(10, 0)).toThrow('Cannot calculate modulo by zero.');
      expect(() => calculate(10, '%', 0)).toThrow(
        'Cannot calculate modulo by zero.',
      );
    });
  });

  describe('power', () => {
    test('raises the base to the exponent from the example operation', () => {
      expect(power(2, 3)).toBe(8);
      expect(calculate(2, '^', 3)).toBe(8);
      expect(calculate(2, '**', 3)).toBe(8);
    });

    test('supports zero, negative, and fractional exponents', () => {
      expect(power(5, 0)).toBe(1);
      expect(power(2, -2)).toBe(0.25);
      expect(power(9, 0.5)).toBe(3);
    });
  });

  describe('square root', () => {
    test('returns the square root from the example operation', () => {
      expect(squareRoot(16)).toBe(4);
      expect(main(['sqrt', '16'])).toBe(4);
    });

    test('supports zero and decimal inputs', () => {
      expect(squareRoot(0)).toBe(0);
      expect(squareRoot(0.25)).toBe(0.5);
    });

    test('rejects negative numbers', () => {
      expect(() => squareRoot(-1)).toThrow(
        'Cannot calculate the square root of a negative number.',
      );
      expect(() => main(['sqrt', '-1'])).toThrow(
        'Cannot calculate the square root of a negative number.',
      );
    });
  });

  test('rejects unsupported operators', () => {
    expect(() => calculate(2, '&', 3)).toThrow(
      'Unsupported operator "&"',
    );
  });
});

describe('main', () => {
  test('parses CLI operands and calculates a result', () => {
    expect(main(['2', '+', '3'])).toBe(5);
    expect(main(['10', '-', '4'])).toBe(6);
    expect(main(['45', '*', '2'])).toBe(90);
    expect(main(['20', '/', '5'])).toBe(4);
    expect(main(['10', '%', '3'])).toBe(1);
    expect(main(['2', '^', '3'])).toBe(8);
  });

  test('parses square root CLI arguments', () => {
    expect(main(['sqrt', '16'])).toBe(4);
  });

  test('rejects a non-numeric square root operand', () => {
    expect(() => main(['sqrt', 'sixteen'])).toThrow(
      'The operand must be a finite number.',
    );
  });

  test('accepts decimal operands', () => {
    expect(main(['1.5', '*', '2'])).toBe(3);
  });

  test('rejects a missing or extra argument', () => {
    expect(() => main(['2', '+'])).toThrow(
      'Usage: node src/calculator.js <number> <operator> <number>',
    );
    expect(() => main(['2', '+', '3', 'extra'])).toThrow(
      'Usage: node src/calculator.js <number> <operator> <number> | sqrt <number>',
    );
  });

  test('rejects non-numeric operands', () => {
    expect(() => main(['two', '+', '3'])).toThrow(
      'The first operand must be a finite number.',
    );
    expect(() => main(['2', '+', 'three'])).toThrow(
      'The second operand must be a finite number.',
    );
  });

  test('propagates division-by-zero errors', () => {
    expect(() => main(['20', '/', '0'])).toThrow('Cannot divide by zero.');
  });
});
