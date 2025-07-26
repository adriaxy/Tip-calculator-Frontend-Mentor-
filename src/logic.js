

export function limitNumbers(limit, number){
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
