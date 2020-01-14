//Number validation and fix for Cash Register App
export function validateCurrency(numStr){
    if(numStr === ''){ //Return 0 if empty
        numStr = 0;
        return numStr.toString();
    }
    const regexDec = /^\d*(?=\.\d{0,2}$)/i;
    if(regexDec.test(numStr) === false){ //Fix number to 2 decimals
        return (parseFloat(numStr).toFixed(2)).toString();
    }
    
    return numStr; //Return number if criteria met.
}

//console.log(validateCurrency("7.00"));

//Generate random ID for objects
export function random_ID_Gen(){
    //https://gist.github.com/gordonbrander/2230317#gistcomment-1713405
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
}

export function toCurrency(num){
    //https://stackoverflow.com/questions/9372624/formatting-a-number-as-currency-using-css
    var x = "$ " + num.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true});
    // return "$ " + number.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true});
    return x;
}