import {ADD_INCOME, ADD_EXPENSE, DELETE_INCOME, 
        DELETE_EXPENSE, LOAD_DEFAULT, CLEAR_INCOMES, 
        CLEAR_EXPENSES, CHANGE_PAGE, UPDATE_EXPENSE, UPDATE_INCOME} from "./constants"
import DEFAULT_STATE from "./default_states"
import EXPENSES_CATEGORIES from "./expenses_default_category"
import { random_ID_Gen } from "../libs/helper_scripts"
import { refresh_total_income, refresh_total_expense, refresh_money_flow } from "./post_reducer_processes"

const expenses_template = EXPENSES_CATEGORIES

//TODO: UPDATE TOTALS AFTER RELEVANT OPERATIONS

const rootReducer = (state = DEFAULT_STATE, payload) => {
    let newState = Object.assign({}, state);

    switch (payload.type){
        //Change page view payload
        case CHANGE_PAGE:
            newState.page = payload.object.page;
            return newState

        //Income Payloads
        case ADD_INCOME:
            newState["income_objects"].push({
                id: payload.object.id,
                source: payload.object.source,
                amount: payload.object.amount
            });

            //Refresh total income
            newState.total_income = refresh_total_income(newState.income_objects);
            //Refrest money flow
            newState.money_flow = refresh_money_flow(newState.total_income, newState.total_expense);
            break;

        case DELETE_INCOME:
            console.log("Delete income invoked" + payload.data.id)
            for (let i = 0; i < newState["income_objects"].length; i++){
                if(newState["income_objects"][i].id === payload.data.id){
                    newState["income_objects"].splice(i,1);
                    break;
                }
            }
            //Refresh total income
            newState.total_income = refresh_total_income(newState.income_objects);
            //Refrest money flow
            newState.money_flow = refresh_money_flow(newState.total_income, newState.total_expense);
            break;
        
        case CLEAR_INCOMES:
            newState["income_objects"] = [];
            //Refresh total income
            newState.total_income = refresh_total_income(newState.income_objects);
            //Refrest money flow
            newState.money_flow = refresh_money_flow(newState.total_income, newState.total_expense);
            break;

        case UPDATE_INCOME:
            console.log("UPDATE income invoked");
            console.log(payload.object)
            for (let i = 0; i < newState["income_objects"].length; i++){
                if(newState["income_objects"][i].id === payload.object.id){
                    newState["income_objects"][i] = {
                        id: payload.object.id,
                        source: payload.object.source,
                        amount: payload.object.amount
                    }
                    break;
                }
            }

            //Refresh total income
            newState.total_income = refresh_total_income(newState.income_objects);
            //Refrest money flow
            newState.money_flow = refresh_money_flow(newState.total_income, newState.total_expense);
            break;

        //Load Default payload
        case LOAD_DEFAULT:
        //Create a new object storing new state for default template
        for (let category in expenses_template) {
            if(!newState.expense_objects.hasOwnProperty(category)){
                newState.expense_objects[category] = [];
            }

            for(let item in expenses_template[category]){
                newState.expense_objects[category].push({
                    id: random_ID_Gen(),
                    item: expenses_template[category][item],
                    amount: 0
                })
            }

            //Refresh total expense
            newState.total_expense = refresh_total_expense(newState.expense_objects);
            //Refrest money flow
            newState.money_flow = refresh_money_flow(newState.total_income, newState.total_expense);
        }
            break;

        //Expense Payloads
        case ADD_EXPENSE:
            if(newState.expense_objects.hasOwnProperty(payload.data.category)){
                newState.expense_objects[payload.data.category].push({
                    id: payload.data.id,
                    item: payload.data.item,
                    amount: payload.data.amount
                });
            } else {
                newState.expense_objects[payload.data.category] = [{
                    id: payload.data.id,
                    item: payload.data.item,
                    amount: payload.data.amount
                }]
            }

            //Refresh total expense
            newState.total_expense = refresh_total_expense(newState.expense_objects);
            //Refrest money flow
            newState.money_flow = refresh_money_flow(newState.total_income, newState.total_expense);
            break;
        
        case DELETE_EXPENSE:
            console.log("Delete expense invoked");
            console.log("ID: " + payload.data.id)
            let obj = newState.expense_objects;
            for(let cat in obj){
                for(let i=0; i< obj[cat].length; i++){
                    if(obj[cat][i].id === payload.data.id){
                        console.log("deleting: "+ obj[cat][i].id);
                        obj[cat].splice(i,1);
                        break; //TODO: TEST THIS
                    }
                }
                // Delete caterory if it is an empty string
                if(obj[cat].length === 0){
                    delete obj[cat];
                }
            }

            //Refresh total expense
            newState.total_expense = refresh_total_expense(newState.expense_objects);
            //Refrest money flow
            newState.money_flow = refresh_money_flow(newState.total_income, newState.total_expense);
            break;
        
        case UPDATE_EXPENSE:
            let obj_update = newState.expense_objects[payload.data.category];
            for(let item in obj_update){
                if(obj_update[item].id === payload.data.id){
                    obj_update[item].amount = payload.data.amount;
                    break;
                }
            }

            //Refresh total expense
            newState.total_expense = refresh_total_expense(newState.expense_objects);
            //Refrest money flow
            newState.money_flow = refresh_money_flow(newState.total_income, newState.total_expense);
            break;

        case CLEAR_EXPENSES:
            newState.expense_objects = {};
            //Refresh total expense
            newState.total_expense = refresh_total_expense(newState.expense_objects);
            //Refrest money flow
            newState.money_flow = refresh_money_flow(newState.total_income, newState.total_expense);
            break;

        default: 
            return newState;
    }

    return newState
}

export default rootReducer;