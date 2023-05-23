const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler;

suite('Unit Tests', function () {
  
convertHandler = new ConvertHandler.ConvertHandler();
  
  suite('getNum', () => {
   // The first test1
    test('should correctly read a whole number input.', () => {
        const result = convertHandler.getNum('45mi');
        assert.isNumber(result);
    });
    test('should correctly read a decimal number input.', () => {
        assert.isNumber(convertHandler.getNum('5.4kg'));
    });
    test('should correctly read a fractional input.', () => {
        assert.isNumber(convertHandler.getNum('3/7mi'));
    });
    test('should correctly read a fractional input with a decimal', () => {
        assert.isNumber(convertHandler.getNum('3.'));
    });

    test('should correctly return an error on a double-fraction input', () => {
        assert.strictEqual(convertHandler.getNum('3/4/5'), 'invalid number')
  });

  });

  suite('getUnit', () => {
    test('should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
        const result = convertHandler.getNum('kg');
        assert.equal(result, 1);
    });
    test('should correctly read each valid input unit.', () => {
        const result = convertHandler.getUnit('3mi');
        assert.equal(result, 'mi');
    });
    test('should correctly return an error for an invalid input unit', () => {
        const result = convertHandler.getUnit('3g')
        assert.equal(result, 'invalid unit')
      });
    test('should return the correct return unit for each valid input unit.', () => {
        const result = convertHandler.getReturnUnit('kg')
        assert.equal(result, 'lbs');
    });
    test('should correctly return the spelled-out string unit for each valid input unit.', () => {
        const result = convertHandler.spellOutUnit('GAL');
        assert.equal(result, 'gal');
    });
  });

  suite('Conversion', () => {
    test('should correctly convert gal to L', () => {
        const result = convertHandler.convert(2, 'gal')
        assert.equal(result, 7.57082)
    });
    test('should correctly convert L to gal', () => {
        const result = convertHandler.convert(2, 'L')
        assert.equal(result, 0.52834)
    });
    test('should correctly convert mi to km', () => {
        const result = convertHandler.convert(2, 'mi')
        assert.equal(result, 3.21868)
    });
    test('should correctly convert km to mi', () => {
        const result = convertHandler.convert(2, 'km')
        assert.equal(result, 1.24275)
    });
    test('should correctly convert lbs to kg', () => {
        const result = convertHandler.convert(2, 'lbs')
        assert.equal(result, 0.90718)
    });

    test('should correctly convert kg to lbs', () => {
        const result = convertHandler.convert(2, 'kg')
        assert.equal(result, 4.40925)
    });
  });
  
});