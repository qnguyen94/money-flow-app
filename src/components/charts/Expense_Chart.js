import React from 'react';

import { ResponsiveSunburst } from '@nivo/sunburst'

class SunburstChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      height: 0,
      width: 0,
      expenseObj: {}
    }
  }

  static getDerivedStateFromProps(props, state) {
    return{
        expenseObj: props.expenseObj
    }
  }

  componentDidMount() {
    this.setState({
      width : document.getElementById("chart_expense_card").getBoundingClientRect().width,
      height : document.getElementById("chart_expense_card").getBoundingClientRect().height
    })
  }

  render(){

    let data = {
        item: "Expense",
        children: []
    }
    // console.log(this.state.expenseObj)

    let expenseObj = this.state.expenseObj
    let testData = [];

    
    for (let category in expenseObj){
      testData.push({
        item: category,
        children: expenseObj[category]
      })
    }

    // console.log(testData)

    data.children = testData;
  
    return(
      <div style={{"height": this.state.height, "width": this.state.width, "diplay": "flex", "flexWrap":"wrap"}}>
        <ResponsiveSunburst
            data={data}
            margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
            identity="item"
            value="amount"
            cornerRadius={2}
            borderWidth={1}
            borderColor="white"
            colors={{ scheme: 'nivo' }}
            // childColor={{ scheme: 'nivo' }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            isInteractive={true}

        />
      </div>
    )
  }
}


export default SunburstChart;