
import {
    limitNumbers,
    validatorValue,
    calculateTipAmount,
    calculateTotal
} from '../src/logic.js';

describe('limitNumbers', () => {
    test('limits number to max value', ()=>{
        expect(limitNumbers(2, 10000)).toBe(10);
    })

    describe('edge cases', () => {
        test('returns the entire number if limit matches number length', () => {
            expect(limitNumbers(4, 1234)).toBe(1234);
        })

        test('returns one number if limit is 1', () => {
            expect(limitNumbers(1, 1234)).toBe(1);
        })

        test('returns one number if limit is 1 and number is one digit', () => {
            expect(limitNumbers(1, 2)).toBe(2);
        })

        test('returns NaN if limit is 0', () => {
            expect(limitNumbers(0, 2)).toBeNaN;
        })

        test('returns NaN if num is negative', () => {
            expect(limitNumbers(1, -2)).toBeNaN;
        })

        test('throws TypeError if number is undefined', ()=>{
            expect(()=> limitNumbers(1)).toThrow(TypeError); //si espero que una función lance un error, no ejecutar la función directamente, se debe pasar como función a expect.
        })
    })
    

})
