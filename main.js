

const calculatorCard = document.querySelector('.tip-calculator-card');
const inputBill = document.getElementById('bill');
const inputPeople = document.getElementById('people');

let inputTipValue = null;
let inputBillValue = null;
let inputPeopleValue = null;


function validatorValue(value){
    return (!isNaN(value) && value > 0) ? value : null;
}

//Validamos y devolvemos el valor del input Bill
inputBill.addEventListener("input", (e) => {
    let value = parseFloat(e.target.value);
    inputBillValue = validatorValue(value);
});


//Validamos y devolvemos el valor del input People
inputPeople.addEventListener("input", (e) => {
    let value = parseFloat(e.target.value);
    inputPeopleValue = validatorValue(value);
});

//Validamos y devolvemos el valor al hacer clic en una de las opciones de "select tip"
function tipValidator(callback){ //pasamos una función callback como parámetro

    const inputCustom = document.getElementById('custom');
    const tipButton = document.querySelector('.tip-buttons')

    tipButton.addEventListener("click", (e)=>{
        if(e.target.tagName === 'BUTTON'){
            const buttonValue = parseFloat(e.target.value);
            if(!isNaN(buttonValue)){
                callback(buttonValue); 
            } 
            //  Se detecta un click que cumple con la condición del if
            //  La función `callback` llama a la función que pasamos como argumento al invocar `tipValidator()`
            //  A esa función se le pasa como argumento el valor del botón
        } else {
            inputTipValue = null;
        }
    });

    // El evento input se dispara cada vez que hay algún cambio dentro de un input
    inputCustom.addEventListener("input", (e) =>{
        let customValue = parseFloat(e.target.value);
        if(!isNaN(customValue) && customValue > 0){
            callback(customValue)
        } else {
            inputTipValue = null;
        }
    })    
}

tipValidator((value) => {
    inputTipValue = value;
    //AQUI AÑADIR UNA FUNCIÓN PARA HACER ALGO CON EL inputValue
})


function inputValidator(){
    if(inputTipValue && inputPeopleValue && inputBillValue){
        console.log(`Tres imputs con valor: bill(${inputBillValue}), tip(${inputTipValue}), people(${inputPeopleValue})`)
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
