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
    dbRef.ref(`${this.props.updateID}/portfolio`).on('value', snap => {
      let coinDataArray = []
      snap.forEach(coin => {
        const coinObject = coin.val()
        const serverKey = coin.key
        coinDataArray.push({coinObject, serverKey})
      })
      this.props.setCoins(coinDataArray)
    })
  }

  deleteCoin = (serverKey) =>{
    let thus = this
    dbRef.ref(`${thus.props.updateID}/portfolio`).child(serverKey).remove()
  }

  round(value, decimals) {
   return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
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
        const id = data.id
        const coin = thus.props.liveData[id]
        const currentValue = thus.round( data.amountOwned*coin.price_cad , 0)
        const roi = thus.round( ((currentValue - data.initialInvestment) / data.initialInvestment)*100, 0)
        let coinTag = (
          <div key={key} className='coinCard'>
            <i onClick={()=>{thus.deleteCoin(serverKey)}} className="fa fa-times" aria-hidden="true"></i>
            <h3 className='coinName'>{data.name}</h3>
            <div className='valueWrapper'>
              <h2> ROI </h2>
              <h3 className='ROI'>{`${roi}%`}</h3>
            </div>
            <div className='valueWrapper'>
              <h2> Value </h2>
              <h3 className='dollarValue'>{`$${currentValue}`}</h3>
            </div>
          </div>
        )
        coinTagArray.push(coinTag)
      })
    return coinTagArray
    }
  }





  render(){
    return(
      <div className='coinList'>
        <AddCoin />
        {this.portfolioGenerator()}
      </div>
    )
  }
}


function mapStateToProps(state){
  const updateID = state.user.uid
  return {
    updateID
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setPortfolio: (payload) => dispatch(setPortfolio(payload))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(coinList)


/*

addCoinToDB(e.target.value)

*/
