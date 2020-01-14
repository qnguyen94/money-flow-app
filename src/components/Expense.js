import React from 'react';
import { store } from '../redux/store'
import {deleteExpense, loadDefault, clearExpenses} from "../redux/actions"
import ADD_EXEPENSE_MODAL from "./modals/modal_addExpense"
import UPDATE_EXPENSE_MODAL from "./modals/modal_updateExpense"

import { toCurrency } from "../libs/helper_scripts"
import "../css/render_area.css"

import { MdEdit, MdDelete } from "react-icons/md";
import { FaPlus, FaEraser, FaUpload } from "react-icons/fa"

import SunburstChart from "./charts/Expense_Chart"

class Expense extends React.Component {
    constructor(store){
        super(store);
        this.state = {
          categories: [],
          selected_cat: "",
          selected_item: "",
          amount: 0,
          selected_id_for_update: "",
          selected_category_for_update: "",
          selected_item_for_update: "",
          selected_amount_for_update: 0,
          default_loaded: false,
        }

        this.handleLoadDefault = this.handleLoadDefault.bind(this)

        this.handleDeleteExpense = this.handleDeleteExpense.bind(this)
        this.handleClearExpenses = this.handleClearExpenses.bind(this)

        this.openAddExpenseModal = this.openAddExpenseModal.bind(this)
        this.openUpdateExpenseModal = this.openUpdateExpenseModal.bind(this)
    }
    
    //Load default template
    handleLoadDefault(){
      if(this.state.default_loaded){
        alert("Already loaded. Clear all input before load default again.")
      }
      else{
        store.dispatch(loadDefault());
        this.setState({default_loaded: true})
      }
    }

    handleDeleteExpense(id){
      store.dispatch(deleteExpense({id: id}))
    }

    //Clear All Expenses
    handleClearExpenses() {
      let confirmation = window.confirm("Are you sure to clear all input? This action cannot be undone.");
      if(confirmation){
        console.log("Confirmed Deletion. Proceed!")
        store.dispatch(clearExpenses());
        this.setState({default_loaded: false})
      }
      else{
        console.log("Deletetion Cancelled")
      }
    }

    openAddExpenseModal(){
      document.getElementById("add_modal_expense").style.display = "block";
    }

    openUpdateExpenseModal(e){
      // console.log("From data attribute:" +  e.id)
      // console.log("From data attribute:" +  e.cat)
      // console.log("From data attribute:" +  e.item)
      // console.log("From data attribute:" +  e.amount)

      this.setState({
        selected_id_for_update: e.id,
        selected_category_for_update: e.cat,
        selected_item_for_update: e.item,
        selected_amount_for_update: e.amount,
      }, () => {
        document.getElementById("update_expense_modal").style.display = "block"
      })
    }

    render(){

      //Render Registered Items
      const EXPENSE_ITEMS_IN_CARD = (object) => {
        
        let item_arr = object.data.item_arr;
        let items_in_list=[];

        // console.log("from ITEM cards: ")

        for(let item of item_arr){
          items_in_list.push(
            <li className="expense_item_li" key={item.id}>
              <hr style={{width: "100%"}}/>
              <div className="expense_li_item">{item.item}</div>

              <div className="expense_li_amount">{toCurrency(item.amount)}</div>
              <div className="module_buttons">
                <button className="card_buttons" onClick={e => this.openUpdateExpenseModal({
                  id:item.id,
                  cat:object.data.category,
                  item: item.item,
                  amount: item.amount
                })}>
                  <MdEdit />
                </button>

                <button className="card_buttons" onClick={e => this.handleDeleteExpense(item.id)} id={item.id}>
                  <MdDelete />
                </button>
              </div>
            </li>
          )
        }
        return items_in_list;
      }
      
      const EXPENSE_CATEGORY_CARDS = (expense_object) => {
        let cat_card_div_list = []
        for(let cat in expense_object.expense_object){
          cat_card_div_list.push(
            <div className="expense_category_card" key={cat.toLowerCase()}>
              <div className="expense_list_category">{cat}</div>
                <ul className="expense_list">
                <EXPENSE_ITEMS_IN_CARD data={
                  {
                    category: cat,
                    item_arr:expense_object.expense_object[cat]
                  }
                  }/>
                </ul>
            </div>
          )
        }
      
        return cat_card_div_list; 
      }

      return (
        <>
          <div className="expense_wrapper">
              
            <div id="expense_buttons" className="buttons">
              {/* Buttons */}
                <ADD_EXEPENSE_MODAL />
                <button title="Add an expense" className="all_buttons" id="open_add_expense_modal" onClick={this.openAddExpenseModal}><FaPlus style={{fontSize: "22px"}}/>Add</button>
                <button title="Delete all expenses" className="all_buttons" id="clear_expenses" onClick={this.handleClearExpenses}><FaEraser style={{fontSize: "22px"}}/>Clear All</button>
                <button title="Load a blank expense template with all zeros" className="all_buttons" id="load_default" onClick={this.handleLoadDefault}><FaUpload />Load Default</button>
              {/* Edit Expense */}
              <UPDATE_EXPENSE_MODAL target={
                {
                  id: this.state.selected_id_for_update,
                  category: this.state.selected_category_for_update,
                  item: this.state.selected_item_for_update,
                  amount: this.state.selected_amount_for_update
                }
              } />
            </div>

            <div id="expense_summary_data" className="summary_data">
              {/* Total Expense */}
              <div id="total_expense_card" className="total_card">
                <p id="total_expense_title">Total Expense</p>
                <p id="total_expense_value">{toCurrency(store.getState().total_expense)}</p> 
              </div>
            </div>

            {/* Cards */}
            <div id="expense_cards" className="detail_cards">
              {/* List of registerd expenses */}
                <EXPENSE_CATEGORY_CARDS expense_object={store.getState().expense_objects} />
            </div>

            {/* Chart */}
            <div id="chart_expense_card" className="chart_area"><SunburstChart expenseObj={store.getState().expense_objects} /></div>

          </div>
        </>
      );
    }
  }
  export default Expense;