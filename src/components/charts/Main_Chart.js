import React from 'react';

import {toCurrency} from '../../libs/helper_scripts'
import { ResponsiveWaffle } from '@nivo/waffle'

class LineChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      income: props.data.income,
      expense: props.data.expense,
      height: 0,
      width: 0
    }
  }

  static getDerivedStateFromProps(props, state) {
    return{
      income: props.data.income,
      expense: props.data.expense,
    }
  }

  componentDidMount() {
    this.setState({
      width : document.getElementById("main_chart").getBoundingClientRect().width,
      height : document.getElementById("main_chart").getBoundingClientRect().height
    })
  }

  render(){
    const total = this.state.income + this.state.expense;

    const data = [
      {
          id: "income",
          label: "Income",
          value: this.state.income,
          // value: (this.state.income/total)*100,
          // color: "hsl(167, 70%, 50%)"
      },
      {
          id: "expense",
          label: "Expense",
          value: this.state.expense,
          // value: (this.state.expense/total)*100,
          // color: "hsl(259, 70%, 50%)"
      },
  ]

    // console.log(this.state.width);
    // console.log(this.state.height);
  
    return(
      <div style={{"height": this.state.height, "width": this.state.width}}>
        <ResponsiveWaffle
            data={data}
            total={total}
            rows={20}
            columns={15}
            margin={{ top: 40, right: 10, bottom: 10, left: 120 }}
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.3 ] ] }}

            tooltip={function(e){return `${e.label} : ${toCurrency(e.value)}`}}

            legends={[
              {
                  anchor: 'top-left',
                  direction: 'column',
                  itemsSpacing: 4,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  itemTextColor: '#777',
                  symbolSize: 20,
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#000',
                              itemBackground: '#f7fafb',
                              itemHeight: 20
                          }
                      }
                  ]
              }
          ]}
        />
      </div>
    )
  }
}


export default LineChart;