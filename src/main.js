
import {
    limitNumbers,
    validatorValue,
    calculateTipAmount,
    calculateTotal,
    limitNumbersToInteger,
    showTemporalOutline,
    showTemporalMessage,
    toggleClassErrorMessage
} from './logic.js';

const form = document.querySelector('form');
const calculatorCard = document.querySelector('.tip-calculator-card');
const inputBill = document.getElementById('bill');
const inputPeople = document.getElementById('people');

const tipAmount = document.querySelector('.tip-amount-result');
const tipTotal = document.querySelector('.tip-amount-total');

const initialTextOutput = "$0.00"

let inputTipValue = null;
let inputBillValue = null;
let inputPeopleValue = null;

const inputCustom = document.getElementById('custom');
const tipButton = document.querySelector('.tip-buttons');
const allButtons = document.querySelectorAll('.tipButton');

const errorMessage = document.getElementById('error-message');
let timeoutID;
console.log(timeoutID)

const inputs = [inputBill, inputPeople, inputCustom];

inputs.forEach(input => {
    input.addEventListener('keydown', (e)=>{
        if(e.key === '-' || e.key === 'e' || e.key === '+' || e.key === ','){
            showTemporalOutline(timeoutID, input, 'invalid-char-input');
            showTemporalMessage(errorMessage, 'show-error-message', 'hide-error-message')
            e.preventDefault();
        } else {
            toggleClassErrorMessage(errorMessage, input, 'show-error-message', 'hide-error-message', 'invalid-char-input')
        }

        if(input === inputPeople || input === inputCustom){
            if(e.key === '.'){
                showTemporalOutline(input);
                e.preventDefault();
            }
        }
    })         
})

function handleInput(e, setValueCallback, limitFunc, maxDigits){
    let value = parseFloat(e.target.value);
    let validated = validatorValue(value);

    if(validated !== null){
        let limited = limitFunc(maxDigits, validated);
        setValueCallback(limited);
        e.target.value = limited;
    } else {
        setValueCallback(null)
    }
}

inputBill.addEventListener("input", (e) => handleInput(e, val => inputBillValue = val, limitNumbers, 6));
inputPeople.addEventListener("input", (e) => handleInput(e, val => inputPeopleValue = val, limitNumbersToInteger, 4));


//Validamos y devolvemos el valor al hacer clic en una de las opciones de "select tip"
function tipValidator(callback){ //pasamos una función callback como parámetro

    tipButton.addEventListener("click", (e)=>{
        allButtons.forEach((button) => {button.classList.remove('active-button')})
        const selectedButton = e.target;
        selectedButton.classList.remove("active-button")

        if(e.target.tagName === 'BUTTON'){
            selectedButton.classList.add("active-button")
            const buttonValue = parseFloat(e.target.value);
            const source = 'button' //identificamos en qué elemento se ha hecho clic

            if(!isNaN(buttonValue)){
                callback(buttonValue, source);
            } 
            //  Se detecta un click que cumple con la condición del if
            //  La función `callback` llama a la función que pasamos como argumento al invocar `tipValidator()`
            //  A esa función se le pasa como argumento el valor del botón
        }
    });

    // El evento input se dispara cada vez que hay algún cambio dentro de un input
    inputCustom.addEventListener("input", (e) =>{
        let customValue = parseInt(e.target.value);
        let finalCustomValue;
        const source = 'custom';
        let validated = validatorValue(customValue);
        if(validated !== null){
            finalCustomValue = limitNumbersToInteger(2, customValue);
            e.target.value = finalCustomValue;
        } 
        if(!isNaN(finalCustomValue) && finalCustomValue > 0){
            callback(finalCustomValue, source)
        }
    })
}

function resetTipDisplay(){
    tipAmount.textContent = initialTextOutput
    tipTotal.textContent = initialTextOutput
}

inputCustom.addEventListener("click", (e)=>{
    if(e.target.value.trim() === ""){
        inputTipValue = null;
        resetTipDisplay();
    }
})

tipValidator((value, source) => {
    inputTipValue = value / 100;

    if(source === 'button'){
        inputCustom.value = "";
    }
    
})

function inputValidator(){
    if(typeof inputTipValue === "number" &&
  typeof inputBillValue === "number" &&
  typeof inputPeopleValue === "number"){
        tipAmount.textContent = calculateTipAmount(inputBillValue, inputTipValue, inputPeopleValue)
        tipTotal.textContent = calculateTotal(inputBillValue, inputTipValue, inputPeopleValue)
    } else {
        resetTipDisplay();
        //   console.log(`valor de tip: ${typeof inputTipValue}`);
        //  console.log(`valor de bill: ${typeof inputBillValue}`);
        //  console.log(`valor de People: ${typeof inputPeopleValue}`);
    }
}

["input", "click", "keydown"].forEach(eventType => {
    calculatorCard.addEventListener(eventType, inputValidator) //handleChange es una función que crearemos (no es una keyword)
});

form.addEventListener('reset', () => {
    inputTipValue = null;
    inputBillValue = null;
    inputPeopleValue = null;
    allButtons.forEach((button) => button.classList.remove("active-button"))
    resetTipDisplay();
})