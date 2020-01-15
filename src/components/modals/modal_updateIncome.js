import React from 'react'
import "./inputModals.css"
import { store } from '../../redux/store'
import { validateCurrency } from "../../libs/helper_scripts"
import { updateIncome } from "../../redux/actions"
import { toCurrency } from "../../libs/helper_scripts"



class UPDATE_INCOME_MODAL extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id: "",
            form_source: "",
            form_amount: 0,
        }

        //Income handlers
        this.handleUpdateIncome = this.handleUpdateIncome.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        //Helper handlers
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        //UPDATE STATE ID FROM PROPS
        // console.warn(props, state)
        if(document.getElementById("current_source") !== null && document.getElementById("current_amount").innerHTML !== null){
            document.getElementById("current_source").innerHTML = props.target.source;
        document.getElementById("current_amount").innerHTML = toCurrency(parseFloat(props.target.amount));
        }
        return {form_source: props.target.source ,id: props.target.id}
        // return null;
    }

    //State changes in amount field
    handleChange(e){
        // console.warn(this.state)
        // console.warn(e.target.id, e.target.value);
        let value = e.target.value;
        if(e.target.id === "form_income_source_update"){
            this.setState({form_source: value})
        }
        else if (e.target.id === "form_income_amount_update"){
            // Prevent too large input
            if (value.length > 11){
                value = value.slice(0,11)
            }
            this.setState({form_amount: value})
        }
    }

    //Format to 2 decimals currency on blur
    handleNumberChange(e){
        let fixedNum = validateCurrency(e)
        this.setState({form_amount: fixedNum})
    }

    //Add Income to Redux Store
    handleUpdateIncome(){
        let form_source = this.state.form_source;
        let form_amount = parseFloat(this.state.form_amount);
        let form_id = this.state.id;

        if(form_source === "" || form_amount <= 0){
            document.getElementById("form_income_update_notification").innerHTML = "Invalid"
        }
        else {
            store.dispatch(updateIncome({
                id: form_id,
                source: form_source,
                amount: form_amount
            }))

            //reset fields
            // document.getElementById("form_income_source_update").value = "";
            this.setState({
                form_source: "",
                form_amount: 0.00
            });
            document.getElementById("form_income_update_notification").innerHTML = ""

            //Remove overlay modal
            document.getElementById("update_modal").style.display = "none";
        }
    }

    handleCancel(){
        //Undisplay
        document.getElementById("update_modal").style.display = "none";
        this.setState({
            id: "",
            form_amount: 0,
            form_source: ""
        })
    }

    render(){

        return (
            <div className="modal" id="update_modal">
                <div className="modal-content">
                    <center><p>Edit Income</p></center>
                    <div>Current Source: <span id="current_source"></span></div> 
                    <div>Current Amount: <span id="current_amount"></span></div>
                    <hr />
                    {/* <label>New Source: </label><input id="form_income_source_update" type="text" maxLength="30" 
                        onChange={this.handleChange} value={this.state.form_source}/> */}

                    <label>New Amount: </label><input id="form_income_amount_update" type="number" max="999999999.99" min="0"
                        onFocus={e => e.target.select()}
                        onChange={this.handleChange} value= {this.state.form_amount} 
                        onBlur={e => this.handleNumberChange(e.target.value)}/>
                    <button id="update_button" onClick={this.handleUpdateIncome}>Update Income</button>
                    <button id="cancel_update_button" onClick={this.handleCancel}>Cancel</button>
                    <span id="form_income_update_notification"></span>
                </div>
            </div>
        )
    }
    
}

export default UPDATE_INCOME_MODAL;