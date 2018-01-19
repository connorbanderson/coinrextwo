import React, { Component } from 'react'
import { Input } from 'antd'
import { firebaseApp } from '../firebase'
import { connect } from 'react-redux'
import { setCoins } from '../actions'
import { dbRef } from '../firebase'
import { Tag } from 'antd'
import AddCoin from '../components/addCoin'

class coinList extends Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentDidMount(){
    this.getCoins()
  }

//  componentWillReceiveProps(nextProps){
//      this.getCoins()
//  }



  getCoins = () => {
    console.log('COINLISTT - Calling Get Coins!!!', this.props.selectedPortfolio);
    dbRef.ref(`${this.props.updateID}/portfolios/${this.props.selectedPortfolio}/coins`).on('value', snap => {
      let coinDataArray = []
      snap.forEach(coin => {
        const coinObject = coin.val()
        console.log('COINLISTT - Snap looping Object....', coinObject);
        const serverKey = coin.key
        coinDataArray.push({coinObject, serverKey})
      })
      this.props.setCoins(coinDataArray)
    })
  }

  deleteCoin = (serverKey) =>{
    let thus = this
    dbRef.ref(`${this.props.updateID}/portfolios/${this.props.selectedPortfolio}/coins`).child(serverKey).remove()
  }

  round(value, decimals) {
   return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
   }

  numberWithCommas = (x) => {
      let parts = x.toString().split(".")
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return parts.join(".")
    }


  coinListGenerator = () => {
    let thus = this
    let coinTagArray = []
    let coinDataArray = this.props.coins
    if (coinDataArray.length < 1){
      return
    } else {
      coinDataArray.forEach(function(key, i){
        const serverKey = coinDataArray[i].serverKey
        const data = coinDataArray[i].coinObject
        console.log('Data is...', data);
        const id = data.id
        const coin = thus.props.liveData[id]
        const currentValue = `$${  thus.numberWithCommas(thus.round( data.amountOwned*coin.price_cad , 0))   }`
        const roi = thus.round( ((currentValue - data.initialInvestment) / data.initialInvestment)*100, 0)
        const iconImage = {
          backgroundImage: `url(https://files.coinmarketcap.com/static/img/coins/32x32/${id}.png)`,
          height: '32px',
          width: '32px'
        }

        let profit = thus.round(((data.amountOwned*coin.price_cad)-data.initialInvestment), 0)
        let negativeProfitText = Math.abs(thus.round(((data.amountOwned*coin.price_cad)-data.initialInvestment), 0))
        let profitText = profit >= 0 ? <div className='profitGainText'> + ${thus.numberWithCommas(profit)} </div> :<div className='profitLossText'> - ${thus.numberWithCommas(negativeProfitText)} </div>
        let coinTag = (
          <div key={i} className='coinCard'>
            <i onClick={()=>{thus.deleteCoin(serverKey)}} className="fa fa-times" aria-hidden="true"></i>
            <div className='iconNameWrapper'>
              <div style={iconImage} />
              <div className='coinName'>{data.name}</div>
            </div>
            <div className='currentValue'>
              <span>{currentValue}</span>
              <span>{profitText}</span>
            </div>
            <div className='valueWrapperLeft'>
              <h2 className='owned'> Owned </h2>
              <Input className="ownedInput" defaultValue={data.amountOwned} placeholder={data.amountOwned} onBlur={(e)=>{console.log(e.target.value)}} addonAfter={<div>{data.symbol}</div>} />
            </div>
            <div className='valueWrapperRight'>
              <h2 className='invested'> Invested </h2>
              <Input className="investedInput" defaultValue={data.initialInvestment} placeholder={data.initialInvestment} onBlur={(e)=>{console.log(e.target.value)}} addonBefore={<div>$</div>} />
            </div>
          </div>
        )
        coinTagArray.push(coinTag)
      })
    return coinTagArray
    }
  }





  render(){
    console.log('COINLISTT RENDERRR HERE!!', this.props.selectedPortfolio)
    if (this.props.selectedPortfolio === null) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div className='coinList'>
          <AddCoin />
          {this.coinListGenerator()}
        </div>
      )
    }
  }
}


function mapStateToProps(state){
  const updateID = state.user.uid
  const coins = state.coins
  return {
    updateID,
    coins,
    liveData: state.liveData,
    selectedPortfolio: state.selectedPortfolio
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setCoins: (payload) => dispatch(setCoins(payload))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(coinList)


/*

addCoinToDB(e.target.value)

*/
