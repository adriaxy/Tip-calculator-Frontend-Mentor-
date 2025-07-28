

export function showTemporalOutline(timeoutID, input, showClass){
    if(timeoutID) {
        clearTimeout(timeoutID);
        timeoutID = null;
    }

    input.classList.add(showClass);

    timeoutID = setTimeout(() => {
        console.log(timeoutID)
        input.classList.remove(showClass)
        timeoutID = null; 
    }, 2000);


    setTimeout(() => {
        input.classList.remove(showClass);
    }, 2000)
}

export function showTemporalMessage(div, showClass, hideClass){
    div.classList.remove(hideClass);
    div.classList.add(showClass);

    setTimeout(() => {
        div.classList.remove(showClass);
        div.classList.add(hideClass);
    }, 2000)
}

export function toggleClassErrorMessage(div, input, showClass, hideClass, hideOutline){
    div.classList.remove(showClass);
    div.classList.add(hideClass);
    input.classList.remove(hideOutline);
}

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
