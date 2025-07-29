let timeoutRefs = new WeakMap();

export function isInvalidKeyForInput(input, key){
    if(input.id === 'bill'){
        return ['-', 'e', '+', ','].includes(key);
    } else if (input.id === 'people' || input.id === 'custom') {
        return ['-', 'e', '+', ',', '.'].includes(key);
    }
}

export function showInputError(input, div, showOutlineClass, showClassMessage, hideClassMessage){
    const timeoutID = timeoutRefs.get(input);
    div.classList.remove(hideClassMessage);
    div.classList.add(showClassMessage);

    if(timeoutID) {
        clearTimeout(timeoutID);
        timeoutRefs.set(input, null);
    }

    input.classList.add(showOutlineClass);

    const newTimeout = setTimeout(() => {
        input.classList.remove(showOutlineClass)
        div.classList.remove(showClassMessage);
        div.classList.add(hideClassMessage);
        timeoutRefs.set(input, null);
    }, 2000);

    timeoutRefs.set(input, newTimeout);
}


export function hideInputError(input, div, showOutlineClass, showClassMessage, hideClassMessage){
    const timeoutID = timeoutRefs.get(input);
    if(timeoutID){
        clearTimeout(timeoutID);
        timeoutRefs.set(input, null);
    }
    
    div.classList.remove(showClassMessage);
    div.classList.add(hideClassMessage);

    input.classList.remove(showOutlineClass);

}

// export function showTemporalMessage(div, showClass, hideClass){
//     div.classList.remove(hideClass);
//     div.classList.add(showClass);

//     setTimeout(() => {
//         div.classList.remove(showClass);
//         div.classList.add(hideClass);
//     }, 2000)
// }

export function limitNumbers(limit, number){
    return parseFloat(number.toString().slice(0,limit))
}

export function limitNumbersToInteger(limit, number){
        return parseInt(number.toString().slice(0,limit))
}

export function validatorValue(value){
    return (!isNaN(value) && value > 0) ? value : null;
}

export function calculateTipAmount(bill, tip, people){
    return `$${parseFloat((bill*tip/people).toFixed(2))}`
}

export function calculateTotal(bill, tip, people){
    let totalTip = bill * tip;
    let totalBill = totalTip + bill
    return `$${parseFloat((totalBill/people).toFixed(2))}`
}
