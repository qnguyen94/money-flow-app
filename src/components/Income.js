import React from 'react';

import "../css/render_area.css"

import { deleteIncome, clearIncomes } from "../redux/actions"
import { store } from '../redux/store'
import { validateCurrency } from "../libs/helper_scripts"
import { toCurrency } from "../libs/helper_scripts"

import ADD_INCOME_MODAL from "./modals/modal_addIncome"
import UPDATE_INCOME_MODAL from "./modals/modal_updateIncome"

import { MdEdit, MdDelete } from "react-icons/md";
import { FaPlus, FaEraser } from "react-icons/fa"

import PieChart from "./charts/Income_Chart"

class Income extends React.Component {

    constructor(store){
        super(store);
        this.state = {
          selected_id_for_update: '',
          selected_source_for_update: '',
          selected_amount_for_update: '',
        }

        this.handleDeleteIncome = this.handleDeleteIncome.bind(this);
        this.handleClearIncome = this.handleClearIncome.bind(this);

        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.openAddModal = this.openAddModal.bind(this);
        this.openUpdateModal = this.openUpdateModal.bind(this);
    }

    //Format to 2 decimals currency on blur
    handleNumberChange(e){
      let fixedNum = validateCurrency(e)
      this.setState({form_amount: fixedNum})
    }

    //State changes in amount field
    handleChange(e){
      this.setState({form_amount: e})
    }
    
    //Delete Income from Redux Store
    handleDeleteIncome(id){
      // console.log(e);
      store.dispatch(deleteIncome({
        id: id
      }))
    }
    
    
    //Clear all income sources in Redux Store
    handleClearIncome(){
      if(store.getState().income_objects.length > 0){
        let confirmation = window.confirm("Are you sure to clear all input? This action cannot be undone.");
        if(confirmation){
          store.dispatch(clearIncomes())
          console.log("Clear Income Confirmeed. Proceed!");
        }
        else{
          console.log("Clear Income Cancelled.");
        }
      }
      else{
        console.log("Nothing to clear");
        alert("Nothing to clear");
      }
    }

    //Open update modal
    openUpdateModal(e){
      console.log(e);
      this.setState({
        selected_id_for_update: e.id,
        selected_source_for_update: e.source,
        selected_amount_for_update: e.amount,
      }, 
        () => document.getElementById("update_modal").style.display ="block"
      )
    }

    //Test open add modal
    openAddModal(){
      document.getElementById("add_modal").style.display = "block";
    }
  
    render(){
      //Create list of incomes
      let incomes = []
      let income_arr = store.getState().income_objects;
      for (let i = 0; i < income_arr.length; i++){
        incomes.push(
          <li className="income_module" key={income_arr[i].id}>
      <p id="income_module_source">{income_arr[i].source}</p> 
            <span id="income_module_amount">{toCurrency(income_arr[i].amount)}</span>
            <div className="module_buttons">
              <button className="card_buttons" 
                      onClick={e => this.openUpdateModal({
                        id:income_arr[i].id,
                        source:income_arr[i].source,
                        amount:income_arr[i].amount 
                      })} alt="Update">
                      <MdEdit />
              </button>

              <div className="card_buttons card_buttons_delete" 
                      onClick={e => this.handleDeleteIncome(income_arr[i].id)}
                      alt="Delete">
                      <MdDelete />
              </div>
            </div>
          </li>
        )
      }
  
      return (
        <>
          <div className="income_wrapper">

            <div id="income_buttons" className="buttons">
              {/* Update Income Modal */}
              <UPDATE_INCOME_MODAL target={{
                id: this.state.selected_id_for_update,
                source: this.state.selected_source_for_update,
                amount: this.state.selected_amount_for_update
              }} />
              {/* Add Income Modal */}
              <ADD_INCOME_MODAL />

              {/* Buttons */}
              <button title="Add an income source" className="all_buttons" id="income_add_btn" onClick={this.openAddModal}><FaPlus style={{fontSize: "22px"}}/>Add</button>
              <button title="Delete all incomes"  className="all_buttons" id="income_clear_btn" onClick={this.handleClearIncome}><FaEraser style={{fontSize: "22px"}}/>Clear All</button> 
            </div>

              {/* Summary of data */}
              <div className="summary_data">
                <div id="total_income_card" className="total_card">
                  <p id="total_income_title">Total Income</p>
                  <p id="total_income_value">{toCurrency(store.getState().total_income)}</p>
                </div>           
              </div>

              {/* Income detail cards */}
              <div id="income_cards" className="detail_cards">
                <ul className="income_list">{incomes}</ul>
              </div>

                {/* Chart */}
                <div id="chart_income_card" className="chart_area">
                  <div><PieChart income_arr={store.getState().income_objects}/></div>
                </div>
          </div>
        </>
      );
    }
  }
  export default Income;