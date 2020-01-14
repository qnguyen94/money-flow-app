//ADD all Incomes
export const refresh_total_income = (income_objects) => {
    let total = 0;
    for(let i = 0; i < income_objects.length; i++){
        total += income_objects[i].amount;
    }

    return total;
}

//ADD all Expenses
export const refresh_total_expense = (expense_objects) => {
    let total = 0;
    for(let cat in expense_objects){
        for(let i=0; i< expense_objects[cat].length; i++){
            total += expense_objects[cat][i].amount;  
        }
    }
    return total;
}

//ADD all Totals
export const refresh_money_flow = (income, expense) => {
    return parseFloat(parseFloat(income - expense).toFixed(2));
}