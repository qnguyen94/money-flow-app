import React from 'react'
import { store } from '../redux/store'
import { changePage } from "../redux/actions"

import "../css/navbar.css"


class NAVBAR extends React.Component {

    constructor(props){
        super(props);
        this.handleNavbarChange = this.handleNavbarChange.bind(this);
    }

    componentDidMount(){
        document.getElementById("nav-redirect_dashboard").classList.add("nav_selected");
    }

    handleNavbarChange(e){
        let target = e.target.id;
        if(target ==="nav-redirect_dashboard"){
            document.getElementById("nav-redirect_dashboard").classList.add("nav_selected");
            store.dispatch(changePage({page: "main"}));

            document.getElementById("nav-redirect_expense").classList.remove("nav_selected");
            document.getElementById("nav-redirect_income").classList.remove("nav_selected");
        }
        else if(target ==="nav-redirect_income"){
            document.getElementById("nav-redirect_income").classList.add("nav_selected");
            store.dispatch(changePage({page: "income"}));

            document.getElementById("nav-redirect_expense").classList.remove("nav_selected");
            document.getElementById("nav-redirect_dashboard").classList.remove("nav_selected");
        }
        else if(target ==="nav-redirect_expense"){
            document.getElementById("nav-redirect_expense").classList.add("nav_selected");
            store.dispatch(changePage({page: "expense"}));

            document.getElementById("nav-redirect_dashboard").classList.remove("nav_selected");
            document.getElementById("nav-redirect_income").classList.remove("nav_selected");
        }
    }

    render(){
        return (
            <div id="navbar">
                <div className="navbar_tab" id="nav-redirect_dashboard" onClick={this.handleNavbarChange}>Dashboard</div>
                    
                <div className="navbar_tab" id="nav-redirect_income" onClick={this.handleNavbarChange}>Income</div>
                    
                <div className="navbar_tab" id="nav-redirect_expense" onClick={this.handleNavbarChange}>Expense</div>
            </div>
        )
    }
    
}

export default NAVBAR;