

const calculatorCard = document.querySelector('.tip-calculator-card');
const inputBill = document.getElementById('bill');
const inputPeople = document.getElementById('people');
    const inputCustom = document.getElementById('custom');

const tipAmount = document.querySelector('.tip-amount-result');
const tipTotal = document.querySelector('.tip-amount-total');

const initialTextOutput = "$0.00"

let inputTipValue = null;
let inputBillValue = null;
let inputPeopleValue = null;


function limitNumbers(limit, number){
    return parseInt(number.toString().slice(0,limit))
}

function validatorValue(value){
    return (!isNaN(value) && value > 0) ? value : null;
}

function handleInput(e, setValueCallback){
    let value = parseFloat(e.target.value);
    let validated = validatorValue(value);

    if(validated !== null){
        let limited = limitNumbers(3, validated);
        setValueCallback(limited);
        e.target.value = limited;
    } else {
        setValueCallback(null)
    }
}

inputBill.addEventListener("input", (e) => handleInput(e, val => inputBillValue = val));
inputPeople.addEventListener("input", (e) => handleInput(e, val => inputPeopleValue = val));


//Validamos y devolvemos el valor al hacer clic en una de las opciones de "select tip"
function tipValidator(callback){ //pasamos una función callback como parámetro

    const inputCustom = document.getElementById('custom');
    const tipButton = document.querySelector('.tip-buttons')

    tipButton.addEventListener("click", (e)=>{
        if(e.target.tagName === 'BUTTON'){
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
        let customValue = parseFloat(e.target.value);
        const source = 'custom';
        if(!isNaN(customValue) && customValue > 0){
            callback(customValue, source)
        }
    })    
}

tipValidator((value, source) => {
    inputTipValue = value / 100;

    if(source === 'button'){
        inputCustom.value = "";
    }
})

function calculateTipAmount(bill, tip, people){
    return `$${parseFloat((bill*tip/people).toFixed(2))}`
}

function calculateTotal(bill, tip, people){
    let totalTip = bill * tip;
    let totalBill = totalTip + bill
    return `$${parseFloat((totalBill/people).toFixed(2))}`
}


function inputValidator(){
    if(typeof inputTipValue === "number" &&
  typeof inputBillValue === "number" &&
  typeof inputPeopleValue === "number"){
        // console.log(`Tres imputs con valor: bill(${inputBillValue}), tip(${inputTipValue}), people(${inputPeopleValue})`)
        tipAmount.textContent = calculateTipAmount(inputBillValue, inputTipValue, inputPeopleValue)
        tipTotal.textContent = calculateTotal(inputBillValue, inputTipValue, inputPeopleValue)
        // console.log(`Tres imputs con valor: bill(${typeof inputBillValue}), tip(${typeof inputTipValue}), people(${typeof inputPeopleValue})`)
    } else {
        tipAmount.textContent = initialTextOutput
        tipTotal.textContent = initialTextOutput
        // console.log(`valor de tip: ${typeof inputTipValue}`);
        // console.log(`valor de bill: ${typeof inputBillValue}`);
        // console.log(`valor de People: ${typeof inputPeopleValue}`);
    }
}

["input", "click", "keydown"].forEach(eventType => {
    calculatorCard.addEventListener(eventType, inputValidator) //handleChange es una función que crearemos (no es una keyword)
});


// calculatorCard.addEventListener("click", (e)=>{
//     let element = e.target.tagName;
//     console.log(inputTipValue)
//     element !== "BUTTON" && element !== "INPUT"? console.log('no') : inputValidator();
// })