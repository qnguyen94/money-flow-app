import React from 'react';
import { store } from '../redux/store'
import "../css/index.css"
import "../css/main.css"
import { toCurrency } from "../libs/helper_scripts"

import WaffleChart from "./charts/Main_Chart"

class Main extends React.Component {

    constructor(props){
      super(props);
      this.state = props.props
    }
  
    render(){
  
      return (
          <div className="main_wrapper">
              <div className="main_summary_data">
                  <div id="main_money_flow">
                  <div className="main_titles" id="main_money_flow_title">Money Flow</div>
                    <p className="main_values" id="main_money_flow_value">{toCurrency(store.getState().money_flow)}</p>
                  </div>
              </div>

              <div className="main_income_data">
                  <div id="main_income">
                  <div className="main_titles" id="main_income_title">Income</div>
                    <p className="main_values" id="main_income_value">{toCurrency(store.getState().total_income)}</p>
                  </div>
              </div>

              <div className="main_expense_data">
                  <div id="main_expense">
                  <div className="main_titles" id="main_expense_title">Expense</div>
                    <p className="main_values" id="main_expense_value">{toCurrency(store.getState().total_expense)}</p>
                  </div>
              </div>

              <div id="main_chart">

                <WaffleChart data={{income: store.getState().total_income, expense: store.getState().total_expense}}/>
                
              </div>
          </div>
      );
    }
  }
  export default Main;