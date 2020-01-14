import React from 'react'
import { store } from '../../redux/store'
import { validateCurrency } from "../../libs/helper_scripts"
import { addExpense } from "../../redux/actions"
import EXPENSES_CATEGORIES from "../../redux/expenses_default_category"

import "./inputModals.css"

class ADD_EXPENSE_MODAL extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            categories: [],
            selected_cat: "",
            selected_item: "",
            amount: 0,
        }

        //Modal handlers
        this.handleAddExpense = this.handleAddExpense.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        //Helper handlers
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleItemChange = this.handleItemChange.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        let cat_arr = []
        for (let cat in EXPENSES_CATEGORIES){
          cat_arr.push(cat)
        }

        //Initialize states after each component loaded
        this.setState({
            categories : cat_arr,
            selected_cat: cat_arr[0]
          }, 
              () => this.setState({selected_item: EXPENSES_CATEGORIES[this.state.selected_cat][0]})
        )
    }

    handleCategoryChange(){
        let selected = document.getElementById("categories").value;
        // console.log(selected);
        this.setState({
            selected_cat: selected
        }, 
        //Fix selected_item state does not change after change Category
        () =>  this.handleItemChange())
    }

    handleItemChange(){
        let selected = "";
        document.getElementById("items") !== null ? 
          selected = document.getElementById("items").value:
          selected = document.getElementById("items_text").value;
        
        // console.log(selected)
        this.setState({
          selected_item: selected
        })
    }

    //State changes in amount field
    handleChange(e){
        let value = e.target.value;

        // Prevent too large input
        if (value.length > 11){
            value = value.slice(0,11)
        }

        this.setState({amount: parseFloat(value)})
    }

    //Format to 2 decimals currency on blur
    handleNumberChange(e){
        let fixedNum = validateCurrency(e.target.value)
        this.setState({amount: fixedNum})
    }

    handleAddExpense(){
        let send_item = this.state.selected_item
        let send_cat = this.state.selected_cat;

        //Prevent adding the same item twice
        let tmp_obj = store.getState().expense_objects;
        let duplicated_found = false;

        // console.log(tmp_obj)

        if(tmp_obj.hasOwnProperty(send_cat)){
            //Prevent adding the same item
            for(let i = 0; i < tmp_obj[send_cat].length; i++){
                // console.log(tmp_obj[send_cat][i])
                if(tmp_obj[send_cat][i].item === send_item){
                    alert("Item already existed!");
                    duplicated_found = true;
                    break;
                }
            }
        }
        if(duplicated_found) return;

        let send_amount = this.state.amount;

        //Prevent sending if other text field at filled
        if(document.getElementById("items_text") !== null){
          if(document.getElementById("items_text").value === "" 
            || document.getElementById("items_text").value === null){
              alert("Item field is empty!");
              return;
          }
        }

        if(this.state.amount <= 0){
            alert("Amount is empty!");
            return;
        }

        
        store.dispatch(addExpense({
            category: send_cat,
            item: send_item,
            amount: parseFloat(send_amount)
        }))

        //Hide Modal
        document.getElementById("add_modal_expense").style.display ="none";
        //Reset Fields
        this.setState({
            selected_cat: this.state.categories[0],
            selected_item: EXPENSES_CATEGORIES[this.state.categories[0]][0],
            amount: 0
        })
    }    


    handleCancel(){
        //Hide Modal
        document.getElementById("add_modal_expense").style.display ="none";

        //Reset Fields
        this.setState({
            selected_cat: this.state.categories[0],
            selected_item: EXPENSES_CATEGORIES[this.state.categories[0]][0],
            amount: 0
        }
        )
    }

    render(){
        return (
            <div className="modal" id="add_modal_expense">
                    <div className="modal-content" >
                        <center><p>Add Expense</p></center>
                        {/* Content Here */}
                        <label>Categories: </label>
                        <select id="categories" value={this.state.selected_cat} onChange={this.handleCategoryChange} onBlur={this.handleCategoryChange}>
                            {this.state.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>

                        {/* Item */}
                        <label>Item: </label>
                        {/* Render a textbox if category is Other */}
                        {this.state.selected_cat === "Other"? <input id="items_text" type="text" onChange={this.handleItemChange}/> : 
                            <select id="items" value={this.state.selected_item} onChange={this.handleItemChange} onBlur={this.handleItemChange}>
                                {/* {console.log(this.state)} */}
                            {/* Prevented mapping empty state before category rendered */}
                            {this.state.selected_cat !== ""
                            && EXPENSES_CATEGORIES[this.state.selected_cat].map(item => <option key={item} value={item}>{item}</option>) }
                        </select>
                        }

                        {/* Amount */}
                        <label>Amount: </label><input id="amount" type="number" maxLength="10" min="0" onFocus={e => e.target.select()}
                        value={this.state.amount} onChange={this.handleChange} onBlur={this.handleNumberChange}/>

                        {/* Buttons */}
                        <div className="modal_buttons">
                            <button id="add_expense" onClick={this.handleAddExpense}>Add Expense</button>
                            <button id="cancel_add" onClick={this.handleCancel}>Cancel</button>
                        </div>
                        
                    </div>
            </div>
        )
    }
    
}

export default ADD_EXPENSE_MODAL;