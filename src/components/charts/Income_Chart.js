import React from 'react';
import { store } from '../../redux/store'
import {toCurrency} from '../../libs/helper_scripts'

import { ResponsivePie } from '@nivo/pie'

class PieChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      height: 0,
      width: 0,
      income_arr: []
    }
  }

  static getDerivedStateFromProps(props, state) {
    return{
      income_arr: props.income_arr
    }
  }

  componentDidMount() {
    this.setState({
      width : document.getElementById("chart_income_card").getBoundingClientRect().width,
      height : document.getElementById("chart_income_card").getBoundingClientRect().height
    })
  }

  render(){
    const data = []

    for (let i = 0; i < this.state.income_arr.length; i++){
      data.push({
        id: this.state.income_arr[i].source,
        label: this.state.income_arr[i].source,
        value: this.state.income_arr[i].amount
      })
    }

    // console.log(this.state.width);
    // console.log(this.state.height);
  
    return(
      <div style={{"height": this.state.height, "width": this.state.width, "diplay": "flex", "flexWrap":"wrap"}}>
        <ResponsivePie
            data={data}
            pixelRatio={1}
            colors={{ scheme: 'nivo' }}
            margin={{ top: 10, right: 40, bottom: 20, left: 40 }}
            animate={true}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            enableRadialLabels={false}
            enableSlicesLabels={false}
            
            tooltip={function(e){return `${e.label} : ${((e.value/store.getState().total_income)*100).toFixed(2)}% - ${toCurrency(e.value)}`}}

            legends={[
              {
                  anchor: 'bottom-left',
                  direction: 'column',
                  translateY: 20,
                  translateX: -10,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  symbolSize: 18,
                  symbolShape: 'square',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#000'
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


export default PieChart;