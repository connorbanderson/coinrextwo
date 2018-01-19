import React, { Component } from 'react';
import { Input } from 'antd'
import { firebaseApp, dbRef } from '../firebase'
import { connect } from 'react-redux'

// Component Imports
import AddCoin from './addCoin'
import CoinList from './coinList'

//Frontend portfolioTabs
import { Icon, Tabs } from 'antd'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector, Cell } from 'recharts'
import { setCoins } from '../actions'

import '../styles/portfolio.css'


const TabPane = Tabs.TabPane;

class portfolio extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount(){
  }

//  componentWillReceiveProps(nextProps){
//      this.getCoins()
//  }






    portfolioDataGenerator = () => {
      if (this.props.coins === undefined || this.props.coins === null){
        return
      } else {
        const keys = Object.keys(this.props.coins)
        let thus = this
        let dataArray = []
        keys.forEach(function(key, i){
          const data = thus.props.coins[i].coinObject
          const coin = thus.props.liveData[data.id]
          const currentValue = data.amountOwned*coin.price_cad
          const dataObject = {
            name: coin.symbol,
            profit: thus.round(((coin.price_cad*data.amountOwned) - data.initialInvestment), 0),
            fullname: coin.name,
            oneHour: coin.percent_change_1h,
            twentyFourHour: coin.percent_change_1h,
            sevenDay: coin.percent_change_1h,
            starting: data.initialInvestment
          }
          dataArray.push(dataObject)
        })
        return dataArray
      }
    }

    portfolioValueGenerator = () => {
      if (this.props.coins === undefined || this.props.coins === null){
        return
      } else {
        const keys = Object.keys(this.props.coins)
        let thus = this
        let totalValue = 0
        let oneHourValue = 0
        let twentyFourHourValue = 0
        let sevenDayValue = 0
        keys.forEach(function(key, i){
          const data = thus.props.coins[i].coinObject
          const coin = thus.props.liveData[data.id]
          const currentValue = data.amountOwned*coin.price_cad

          let previousValue1Hour = ((data.amountOwned*coin.price_cad) / (1+(coin.percent_change_1h/100)) )
          let previousValue24Hour = ((data.amountOwned*coin.price_cad) / (1+(coin.percent_change_24h/100)) )
          let previousValue7Day = ((data.amountOwned*coin.price_cad) / (1+(coin.percent_change_7d/100)) )

          totalValue = totalValue + (data.amountOwned*coin.price_cad)
          oneHourValue = oneHourValue + ( (data.amountOwned*coin.price_cad) - previousValue1Hour )
          twentyFourHourValue = twentyFourHourValue + ( (data.amountOwned*coin.price_cad) - previousValue24Hour )
          sevenDayValue = sevenDayValue + ( (data.amountOwned*coin.price_cad) - previousValue7Day )
        })

        let oneHourPercentage = (1-(totalValue / (totalValue + oneHourValue)))*100
        let twentyFourHourPercentage = (1-(totalValue / (totalValue + twentyFourHourValue)))*100
        let sevenDayPercentage = (1-(totalValue / (totalValue + sevenDayValue)))*100

        const dataObject = {
          totalValue: this.numberWithCommas(this.round(totalValue, 0)),
          oneHourValue: this.numberWithCommas(this.round(oneHourValue, 0)),
          oneHourPercentage: this.round(oneHourPercentage, 1),
          twentyFourHourValue: this.numberWithCommas(this.round(twentyFourHourValue, 0)),
          twentyFourHourPercentage: this.round(twentyFourHourPercentage, 1),
          sevenDayValue: this.numberWithCommas(this.round(sevenDayValue, 0)),
          sevenDayPercentage: this.round(sevenDayPercentage, 1)
        }
        return dataObject
      }
    }

    numberWithCommas = (x) => {
        let parts = x.toString().split(".")
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return parts.join(".")
      }

    round(value, decimals) {
     return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
     }

  render(){

    console.log('UH SDfjksadlkfaklsdjfasdlkjf', this.props.coins)
    if (this.props.selectedPortfolio === undefined || this.props.selectedPortfolio === null){
      return(
        <div> </div>
      )
    } else {
      const graphHeight= (window.innerHeight * .8) - 180
      const graphWidth= window.innerWidth * .90
      let portfolioData = this.portfolioDataGenerator()

      const portfolioValue = this.portfolioValueGenerator()

      // const portfolioData = [
      //   {name: this.props.coins['ETH'].symbol, uv: this.props.coins['ETH'].price*8.3, fullname: this.props.coins['ETH'].name},
      //   {name: this.props.coins['BTC'].symbol, uv: this.props.coins['BTC'].price*0.60540599, fullname: this.props.coins['BTC'].name},
      //   {name: this.props.coins['BCH'].symbol, uv: this.props.coins['BCH'].price*0.60540599, fullname: this.props.coins['BCH'].name}
      // ]

      // const portfolioValue = this.round(
      //   (
      //     (this.props.coins['BTC'].price*0.60540599 +
      //     this.props.coins['BCH'].price*0.60540599 +
      //     this.props.coins['ETH'].price*8.3)*1.25
      //   ), 0
      // )
      console.log('JUST DANCE!!!', this.props);
      return(
        <div className='portfolioInnerPage'>
          <Tabs defaultActiveKey="1">
            <TabPane className='tab' tab={<span><Icon type="dashboard" />Dashboard</span>} key="0">

              <div className='portfolioValueWrapper'>
                <span className='mainValue'>${portfolioValue.totalValue}</span>
                <div className='timeWrapper'>
                  <div className='wrapper'>
                    <div className='timeSpan'> 1H </div>
                      <div className='valueWrapper'>
                        <div className='value'> ${portfolioValue.oneHourValue} </div>
                        <div className='value'> {portfolioValue.oneHourPercentage}% </div>
                      </div>
                  </div>
                  <div className='wrapper'>
                    <div className='timeSpan'> 24H </div>
                      <div className='valueWrapper'>
                        <div className='value'> ${portfolioValue.twentyFourHourValue} </div>
                        <div className='value'> {portfolioValue.twentyFourHourPercentage}% </div>
                      </div>
                  </div>
                  <div className='wrapper'>
                    <div className='timeSpan'> 7D </div>
                    <div className='valueWrapper'>
                      <div className='value'> ${portfolioValue.sevenDayValue} </div>
                      <div className='value'> {portfolioValue.sevenDayPercentage}% </div>
                    </div>
                  </div>
                </div>
              </div>

              <BarChart width={graphWidth} height={graphHeight} data={portfolioData}>
                <XAxis dataKey="name" style={{fontSize: '8px'}}/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                  <Bar dataKey="starting" stackId="a" fill="#212121" />
                  <Bar dataKey="profit" stackId="a" >
                    {
                      portfolioData.map((entry, index) => {
                        const color = entry.profit >= 0 ? '#8BC34A' : '#D50000'
                        return <Cell fill={color} />;
                      })
                    }
                  </Bar>
              </BarChart>
            </TabPane>
            <TabPane className='tab' tab={<span><Icon type="edit" />Manage</span>} key="1">
              <CoinList />
            </TabPane>
          </Tabs>
        </div>
      )
    }
  }
}

function mapStateToProps(state){
  return {
    updateID: state.user.uid,
    liveData: state.liveData,
    selectedPortfolio: state.selectedPortfolio,
    coins: state.coins
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setCoins: (payload) => dispatch(setCoins(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(portfolio)
