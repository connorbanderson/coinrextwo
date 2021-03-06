import React, { Component } from 'react';
import { Input } from 'antd'
import { firebaseApp } from '../firebase'
import { connect } from 'react-redux'

import { addCoinToPortfolio } from '../firebase'

import { Select, Button } from 'antd';
const Option = Select.Option;


class addCoin extends Component {

  constructor(props){
    super(props)
    this.state = {
      newCoinID: null,
      newCoinAmntOwned: null,
      newCoinInitialInvestment: null,
      newCoinNameError: false,
      newCoinAmntOwnedError: false,
      newCoinInitialInvestmentError: false
    }
  }

  addCoinHandler = () => {
    let validInfo = true
    if (this.state.newCoinID === null){
       validInfo = false
       this.setState({newCoinNameError: true})
    } else if (this.state.newCoinAmntOwned === null) {
        validInfo = false
        this.setState({newCoinAmntOwnedError: true})
    } else if (this.state.newCoinInitialInvestment === null) {
        validInfo = false
        this.setState({newCoinAmntOwnedError: true})
    } else if (validInfo) {
      let id = this.state.newCoinID
      const payload = {
        id,
        name: this.props.liveData[this.state.newCoinID].name,
        amountOwned: this.state.newCoinAmntOwned,
        initialInvestment: this.state.newCoinInitialInvestment,
        symbol: this.props.liveData[this.state.newCoinID].symbol
      }
      this.setState({newCoinAmntOwned: "", newCoinID: "", newCoinInitialInvestment: ""})
      addCoinToPortfolio(this.props.updateID, this.props.selectedPortfolio, payload)
    }
  }

  componentDidMount(){
    this.generateCoinOptionList()
  }

  generateCoinOptionList = () => {
    let liveData = this.props.liveData
    const keys = Object.keys(liveData)
    let optionList = []
    keys.forEach(function(key, i){
      let data = liveData[key]
      let name = data.name
      let option = (
        <Option key={i*.49} value={data.id}> {name} </Option>
      )
      optionList.push(option)
    })
    return optionList
  }

  render(){
    return(
      <div className='addCoin'>
        <div className='addCard'>
          <Select
            size='small'
            className='cardSelect'
            placeholder='Select a Crypto'
            onChange={(value) => {this.setState({newCoinID: value}) }}
            autoFocus={true}
            showSearch={true}
            value={this.state.newCoinID}
          >
            {this.generateCoinOptionList()}
          </Select>
          <div className='innerDiv'>
            <h3>Amount Owned</h3>
            <Input size='small'
              onPressEnter={()=>{this.addCoinHandler()}}
              onChange={(e)=>{this.setState({newCoinAmntOwned: e.target.value})}}
              type="number"
              min="0.00"
              max="999999999999"
              placeholder="0"
              value={this.state.newCoinAmntOwned} />
          </div>
          <div className='innerDiv'>
            <h3>Initial Investment</h3>
            <Input
              size='small'
              onPressEnter={()=>{this.addCoinHandler()}}
              onChange={(e)=>{this.setState({newCoinInitialInvestment: e.target.value})}}
              addonBefore="$"
              placeholder="0"
              type="number"
              min="0.00"
              max="999999999999"
              value={this.state.newCoinInitialInvestment} />
          </div>
          <Button size='small' className='addButton' onClick={()=>{this.addCoinHandler()}}>Add</Button>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    updateID: state.user.uid,
    liveData: state.liveData,
    selectedPortfolio: state.selectedPortfolio
  }
}


export default connect(mapStateToProps, null)(addCoin)


/*

addCoinToDB(e.target.value)

*/
