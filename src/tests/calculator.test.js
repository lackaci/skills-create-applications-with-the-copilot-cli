const { calculate, main } = require('../calculator');

const USAGE = [
  'Usage:',
  '  node src/calculator.js <number> <operator> <number>',
  '  node src/calculator.js sqrt <number>',
].join('\n');

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
    test('returns the remainder', () => {
      expect(calculate(10, '%', 3)).toBe(1);
    });

    test('rejects modulo by zero', () => {
      expect(() => calculate(10, '%', 0)).toThrow('Cannot modulo by zero.');
    });
  });

  describe('exponentiation', () => {
    test('raises to a power', () => {
      expect(calculate(2, '^', 3)).toBe(8);
      expect(calculate(2, '**', 3)).toBe(8);
    });
  });

  describe('square root', () => {
    test('returns the square root', () => {
      expect(calculate(9, 'sqrt')).toBe(3);
    });

    test('rejects negative operands', () => {
      expect(() => calculate(-1, 'sqrt')).toThrow(
        'Cannot take square root of a negative number.',
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
  });

  test('accepts decimal operands', () => {
    expect(main(['1.5', '*', '2'])).toBe(3);
  });

  test('supports modulo, exponentiation, and square root', () => {
    expect(main(['10', '%', '3'])).toBe(1);
    expect(main(['2', '^', '3'])).toBe(8);
    expect(main(['sqrt', '9'])).toBe(3);
  });

  test('rejects a missing or extra argument', () => {
    expect(() => main(['2', '+'])).toThrow(USAGE);
    expect(() => main(['2', '+', '3', 'extra'])).toThrow(USAGE);
    expect(() => main(['sqrt'])).toThrow(USAGE);
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

  test('propagates additional operation errors', () => {
    expect(() => main(['10', '%', '0'])).toThrow('Cannot modulo by zero.');
    expect(() => main(['sqrt', '-1'])).toThrow(
      'Cannot take square root of a negative number.',
    );
    expect(() => main(['9', 'sqrt', '0'])).toThrow(
      'Square root operator only accepts one operand.',
    );
  });
});
