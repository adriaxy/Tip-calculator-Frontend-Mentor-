
import {
    limitNumbers,
    validatorValue,
    calculateTipAmount,
    calculateTotal,
    isInvalidKeyForInput
} from '../src/logic.js';

describe('limitNumbers', () => {
    test('limits number to max value', ()=>{
        expect(limitNumbers(2, 10000)).toBe(10);
    })

    test('limits number to max value', ()=>{
        expect(limitNumbers(2, 1.234)).toBe(12);
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

describe('validatorValue', () => {
    test('returns value if value is a number', () => {
        expect(validatorValue(20)).toBe(20)
    })

    test('returns value if value is a positive decimal', () => {
        expect(validatorValue(2.0)).toBe(2.0)
    })

    test('returns null if value is 0', () => {
        expect(validatorValue(0)).toBe(null)
    })

    test('returns null if value is a negative number', () => {
        expect(validatorValue(-3)).toBe(null)
    })

    test('returns null if value is not a number (string)', () => {
        expect(validatorValue('0')).toBe(null)
    })

    test('returns null if value is undefined', () => {
        expect(validatorValue()).toBe(null)
    })
})

describe ('isInvalidKeyForInput', ()=> {
    test('returns true if input is bill and key includes "+"', ()=>{
    const input = { id: 'bill' }
        expect(isInvalidKeyForInput(input, '+')).toBe(true);
    })

    test('returns false if input is bill and key include "."', ()=>{
    const input = { id: 'bill' }
        expect(isInvalidKeyForInput(input, '.')).toBe(false);
    })

    test('returns true if input is custom and key includes "."', ()=>{
    const input = { id: 'custom' }
        expect(isInvalidKeyForInput(input, '.')).toBe(true);
    })

    test('returns false if input is custom and key is number', ()=>{
    const input = { id: 'custom' }
        expect(isInvalidKeyForInput(input, '9')).toBe(false);
    })

    test('returns undefined if input is not bill/custom/people', ()=>{
    const input = { id: 'car' }
        expect(isInvalidKeyForInput(input, '.')).toBe(undefined);
    })
})

