import React from 'react'
import { store } from '../../redux/store'
import { validateCurrency } from "../../libs/helper_scripts"
import { addIncome } from "../../redux/actions"

import "./inputModals.css"

class ADD_INCOME_MODAL extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            form_amount: 0
        }

        //Income handlers
        this.handleAddIncome = this.handleAddIncome.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        //Helper handlers
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //State changes in amount field
    handleChange(e){
        let value = e.target.value;

        // Prevent too large input
        if (value.length > 11){
            value = value.slice(0,11)
        }

        this.setState({form_amount: value})
    }

    //Format to 2 decimals currency on blur
    handleNumberChange(e){
        let fixedNum = validateCurrency(e)
        this.setState({form_amount: fixedNum})
    }

    //Add Income to Redux Store
    handleAddIncome(){
        let form_source = document.getElementById("form_income_source").value;
        let tmp_obj = store.getState().income_objects;

        //Prevent adding the same source twice
        let duplicated_found = false;
        for(let i = 0; i < tmp_obj.length; i++){
            if(tmp_obj[i].source === form_source){
                duplicated_found = true;
                alert("Income source already existed!");
                break;
            }
        }
        if(duplicated_found) return;


        //Check for amount validity
        let form_amount = parseFloat(document.getElementById("form_income_amount").value);
        if(form_source === "" || form_amount <= 0){
            document.getElementById("form_income_notification").innerHTML = "Invalid"
        }
        else {
            document.getElementById("form_income_notification").innerHTML = ""
            store.dispatch(addIncome({
            source: form_source,
            amount: form_amount
        }))

            //reset fields
            document.getElementById("form_income_source").value = "";
            this.setState({form_amount: 0})

            //Remove overlay modal
            document.getElementById("add_modal").style.display = "none";
        }
    }

    handleCancel(){
        //Undisplay
        document.getElementById("add_modal").style.display = "none";
        //Reset fields
        document.getElementById("form_income_source").value = "";
        this.setState({form_amount: 0})
    }

    render(){
        return (
            <div className="modal" id="add_modal">
                <div className="modal-content">
                    <center><p>Add Income</p></center>
                    <label>Source: </label><input id="form_income_source" type="text" maxLength="30" />
                    <label>Amount: </label><input id="form_income_amount" type="number" min="0" onFocus={e => e.target.select()}
                        value={this.state.form_amount} onChange={this.handleChange} onBlur={e => this.handleNumberChange(e.target.value)}/>
                    
                    <div className="modal_buttons">
                        <button id="add_button" onClick={this.handleAddIncome}>Add Income</button>
                        <button id="cancel_button" onClick={this.handleCancel}>Cancel</button>
                    </div>
                    
                    <span id="form_income_notification"></span>
                </div>
            </div>
        )
    }
    
}

export default ADD_INCOME_MODAL;