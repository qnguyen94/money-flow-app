import React from 'react'
import "./inputModals.css"
import { store } from '../../redux/store'
import { validateCurrency } from "../../libs/helper_scripts"
import { updateExpense } from "../../redux/actions"
import { toCurrency } from "../../libs/helper_scripts"

class UPDATE_EXPENSE_MODAL extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id: "",
            category: "",
            item: "",
            amount: 0,
            form_amount: 0,
        }

        //Expense handlers
        this.handleUpdateExpense = this.handleUpdateExpense.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        //Helper handlers
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        //UPDATE STATE ID FROM PROPS
        // console.warn(props)
        return {
            id: props.target.id,
            category: props.target.category,
            item: props.target.item,
            amount: props.target.amount
        };
    }

    //State changes in amount field
    handleChange(e){

        let value = e.target.value;
        // Prevent too large input
        if (value.length > 11){
            value = value.slice(0,11)
        }

        this.setState({
            form_amount: value
        })
    }

    //Format to 2 decimals currency on blur
    handleNumberChange(e){
        let fixedNum = validateCurrency(e)
        this.setState({form_amount: fixedNum})
    }

    //Add Expense to Redux Store
    handleUpdateExpense(){
        // Check Input
        if(this.state.form_amount <= 0){
            document.getElementById("update_modal_notification").innerHTML = "Invalid";
            return;
        }

        //Dispatch change
        store.dispatch(updateExpense({
            id: this.state.id,
            category: this.state.category,
            item: this.state.item,
            amount: parseFloat(this.state.form_amount)
        }))

        //reset fields
        //Reset component fields
        document.getElementById("update_modal_notification").innerHTML = "";
        this.setState({
            id: "",
            category: "",
            item: "",
            amount: 0,
            form_amount: 0
        })

        //Remove overlay modal
        document.getElementById("update_expense_modal").style.display = "none";
    }

    handleCancel(){
        //Undisplay
        document.getElementById("update_expense_modal").style.display = "none";

        //Reset component fields
        document.getElementById("update_modal_notification").innerHTML = "";
        this.setState({
            id: "",
            category: "",
            item: "",
            amount: 0,
            form_amount: 0
        })
    }

    render(){

        return (
            <div className="modal" id="update_expense_modal">
                <div className="modal-content">
                    <center><p>Edit Expense</p></center>
                    <div>Category: <span id="current_category">{this.state.category}</span></div> 
                    <div>Item: <span id="current_item"></span>{this.state.item}</div>
                    <div>Amount: <span id="current_amount"></span>{toCurrency(parseFloat(this.state.amount))}</div>
                    <br />
                    <p id="update_modal_notification"></p>
                    <label>New Amount: </label><input id="form_expense_amount_update" type="number" maxLength="10"
                        onFocus={e => e.target.select()}
                        onChange={this.handleChange} value= {this.state.form_amount} 
                        onBlur={e => this.handleNumberChange(e.target.value)}/>
                    <button id="update_button" onClick={this.handleUpdateExpense}>Update Expense</button>
                    <button id="cancel_update_button" onClick={this.handleCancel}>Cancel</button>
                    <span id="form_expense_update_notification"></span>
                </div>
            </div>
        )
    }
    
}

export default UPDATE_EXPENSE_MODAL;