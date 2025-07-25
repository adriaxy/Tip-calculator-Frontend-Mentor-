


const inputBill = document.getElementById('bill');
const inputPeople = document.getElementById('people');

let inputTipValue = null;
let inputBillValue = null;
let inputPeopleValue = null;
 
//Validamos y devolvemos el valor del input Bill
inputBill.addEventListener("input", (e) => {
    let value = parseFloat(e.target.value);

    if(!isNaN(value) && value > 0){
        inputBillValue = value;
        console.log(inputBillValue)
    };
});

//Validamos y devolvemos el valor del input People
inputPeople.addEventListener("input", (e) => {
    let value = parseFloat(e.target.value);

    if(!isNaN(value) && value > 0){
        inputPeopleValue = value;
        console.log(inputPeopleValue)
    }
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
        } 
    });

    // El evento input se dispara cada vez que hay algún cambio dentro de un input
    inputCustom.addEventListener("input", (e) =>{
        let customValue = parseFloat(e.target.value);
        if(!isNaN(customValue) && customValue > 0){
            callback(customValue)
        } 
    })    
}

tipValidator((value) => {
    inputTipValue = value;
    console.log(`Tip seleccionado ${inputTipValue}%`)

    //AQUI AÑADIR UNA FUNCIÓN PARA HACER ALGO CON EL inputValue
})

