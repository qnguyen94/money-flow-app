import {ADD_INCOME, ADD_EXPENSE, DELETE_INCOME, 
    DELETE_EXPENSE, LOAD_DEFAULT, CLEAR_INCOMES, 
    CLEAR_EXPENSES, CHANGE_PAGE, UPDATE_EXPENSE, UPDATE_INCOME} from "./constants"
import { random_ID_Gen } from "../libs/helper_scripts"

export const changePage = (obj) => {
    return {
        type: CHANGE_PAGE,
        object: {
            page: obj.page
        }
    }
}
    

export const addIncome = (object) => {
    return {
        type: ADD_INCOME,
        object: {
            id: random_ID_Gen(),
            source: object.source,
            amount: object.amount
        }
    }
}

export const deleteIncome = (object) => {
    return {
        type: DELETE_INCOME,
        data: {
            id: object.id
        }
    }
}

export const updateIncome = (object) => {
    return {
        type: UPDATE_INCOME,
        object: {
            id: object.id,
            source: object.source,
            amount: object.amount
        }
    }
}

export const addExpense = (object) => {
    return {
        type: ADD_EXPENSE,
        data: {
            id: random_ID_Gen(),
            category: object.category,
            item: object.item,
            amount: object.amount
        }
    }
}

export const updateExpense = (object) => {
    return {
        type: UPDATE_EXPENSE,
        data: {
            id: object.id,
            category: object.category,
            item: object.item,
            amount: object.amount
        }
    }
}

export const deleteExpense = (object) => {
    return {
        type: DELETE_EXPENSE,
        data: {
            id: object.id
        }
    }
}

export const loadDefault = () => {
    return {
        type: LOAD_DEFAULT
    }
}

export const clearIncomes = () => {
    return {
        type: CLEAR_INCOMES
    }
}

export const clearExpenses = () => {
    return {
        type: CLEAR_EXPENSES
    }
}