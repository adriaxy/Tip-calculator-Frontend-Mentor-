const inputBill = document.getElementById('bill');
//const inputCustom = document.getElementById('custom');


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

    inputCustom.addEventListener("input", (e) =>{
        let inputValue = parseFloat(e.target.value);
        if(!isNaN(inputValue) && inputValue > 0){
            callback(inputValue)
        } 
    })    
}


function padre(){
    let inputTipValue = null;

    tipValidator((value) => {
        inputTipValue = value;
        console.log(inputTipValue);
    });

    console.log(inputTipValue)
}

padre()