import React from 'react';
import { store } from './redux/store'

//Import pages components
import Main from "./components/Main"
import Income from "./components/Income"
import Expense from "./components/Expense"

//Other components
import HEADER from "./components/header"
import FOOTER from "./components/footer"
import NAVBAR from "./components/nav"
import "./css/app.css"

class App extends React.Component {

  render(){
  
    // console.log("Current Page: " + store.getState().page)

    return (
      <main>
        {/* Page Header Here */}
        <HEADER />
        
        {/* Conditional Rendering */}
        <div className="body">
          <NAVBAR />
          <div id="dashboard_render">
            {store.getState().page === "main"? <Main />:
              store.getState().page === "income"? <Income />:
              store.getState().page === "expense"? <Expense />:
              "Something wrong with store state"}
          </div>         
        </div>
        {/* Page Footer Here */}
        <FOOTER />
      </main>
    );
  }
}
export default App;