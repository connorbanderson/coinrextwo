import React, { Component } from 'react';
import { Input } from 'antd'
import { addNewPortfolioToAccount } from '../firebase'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { portfolioListner, dbRef } from '../firebase'

import { setPortfolios, setSelectedPortfolio, setCoins } from '../actions'

import Portfolio from './portfolio'

// Frontend Library Import(s)
import { Select, Button, Icon, Modal, Tabs } from 'antd'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog';

// Style Import(s)
import '../styles/mainDashboard.css'


const Option = Select.Option;
const TabPane = Tabs.TabPane;


class mainDashboard extends Component {

  constructor(props){
    super(props)
    this.state = {
      newCoinID: null,
      newCoinAmntOwned: null,
      newCoinInitialInvestment: null,
      newCoinNameError: false,
      newCoinAmntOwnedError: false,
      newCoinInitialInvestmentError: false,
      isNewPortfolioModalActive: false,
      newPortfolioTheme: null,
      newPortfolioName: null,
      activePortfolio: null
    }
  }



  componentDidMount(){
    this.generateCoinOptionList()
    dbRef.ref(`${this.props.updateID}/portfolios`).on('value', snap => {
      let portfolioDataObject = {}
      snap.forEach(portfolio => {
        const portfolioObject = portfolio.val()
        const serverKey = portfolio.key
        portfolioDataObject[serverKey] = portfolioObject
      })
      this.props.setPortfolios(portfolioDataObject)
    })
  }

  getSelectedPortfolio = () => {
    let thus = this
    if (this.props.portfolios === null || this.props.portfolios === undefined) return
    else {
      const portfolios = this.props.portfolios
      const keys = Object.keys(portfolios)
      let activePortfolio = null
      keys.forEach(function(key, i){
         if (i === 0){
           activePortfolio = key
         }
      })
      this.props.setSelectedPortfolio(activePortfolio)
      return activePortfolio
    }
  }

  setInitialSelectedPortfolio = () => {
    let thus = this
    if (this.props.portfolios === null || this.props.portfolios === undefined) return
    else {
      const portfolios = this.props.portfolios
      const keys = Object.keys(portfolios)
      let activePortfolio = null
      keys.forEach(function(key, i){
         if (i === 0){
           activePortfolio = key
         }
      })
      this.setState({activePortfolio})
    }
  }


  generateCoinOptionList = () => {
    let liveData = this.props.liveData
    const keys = Object.keys(liveData)
    let optionList = []
    keys.forEach(function(key, i){
      let data = liveData[key]
      let name = data.name
      let option = (
        <Option key={key} value={data.id}> {name} </Option>
      )
      optionList.push(option)
    })
    return optionList
  }

  toggleNewPortfolioModal = () => {
    this.setState({isNewPortfolioModalActive: !this.state.isNewPortfolioModalActive})
  }

  handleNewPortfolio = () => {
    console.log('NEW PORTFOLIO YAYYY!!!', this.state.newPortfolioName, this.state.newPortfolioTheme)
    let theme = this.state.newPortfolioTheme === null ? 'gradient1' : this.state.newPortfolioTheme
    let name = this.state.newPortfolioName === null ? '' : this.state.newPortfolioName
    let coins = []
    const payload = {
      name,
      theme,
      coins
    }
    addNewPortfolioToAccount(this.props.updateID, payload)
    this.setState({isNewPortfolioModalActive: false})
  }

  gradientGenerator = () => {
    let themeArray = []
    for (let i = 1; i <= 16; i++){
      let portfolioImage = classNames({
        'image': true,
        [`gradient${i}`]: true
      })
      let isSelected = this.state.newPortfolioTheme == `gradient${i}` ? true : false
      let portfolioCheckMark = classNames({
        'checkMarkOn': isSelected,
        'checkMarkOff': !isSelected
      })
      themeArray.push(this.gradientElement(portfolioImage, portfolioCheckMark, i))
    }
    return themeArray
  }

  gradientElement(portfolioImage, portfolioCheckMark, i){
    return(
      <div onClick={()=>this.setState({newPortfolioTheme: `gradient${i}`})} className='portfolioIcon'>
        <div className={portfolioImage}>
          <Icon className={portfolioCheckMark} type="check" />
        </div>
      </div>
    )
  }

  colorGenerator = () => {
    let themeArray = []
    for (let i = 1; i <= 16; i++){
      let portfolioImage = classNames({
        'image': true,
        [`color${i}`]: true
      })
      let isSelected = this.state.newPortfolioTheme == `color${i}` ? true : false
      let portfolioCheckMark = classNames({
        'checkMarkOn': isSelected,
        'checkMarkOff': !isSelected
      })
      themeArray.push(this.colorElement(portfolioImage, portfolioCheckMark, i))
    }
    return themeArray
  }

  colorElement(portfolioImage, portfolioCheckMark, i){
    return(
      <div onClick={()=>this.setState({newPortfolioTheme: `color${i}`})} className='portfolioIcon'>
        <div className={portfolioImage}>
          <Icon className={portfolioCheckMark} type="check" />
        </div>
      </div>
    )
  }

  memeGenerator = () => {
    let themeArray = []
    for (let i = 1; i <= 23; i++){
      let portfolioImage = classNames({
        'image': true,
        [`meme${i}`]: true
      })
      let isSelected = this.state.newPortfolioTheme == `meme${i}` ? true : false
      let portfolioCheckMark = classNames({
        'checkMarkOn': isSelected,
        'checkMarkOff': !isSelected
      })
      themeArray.push(this.memeElement(portfolioImage, portfolioCheckMark, i))
    }
    return themeArray
  }

  memeElement(portfolioImage, portfolioCheckMark, i){
    return(
      <div onClick={()=>this.setState({newPortfolioTheme: `meme${i}`})} className='portfolioIcon'>
        <div className={portfolioImage}>
          <Icon className={portfolioCheckMark} type="check" />
        </div>
      </div>
    )
  }

  portfolioGenerator = () => {
    let thus = this
    if (this.props.portfolios === null || this.props.portfolios === undefined) return
    else {
      const portfolios = this.props.portfolios
      const keys = Object.keys(portfolios)
      let portfolioList = []
      keys.forEach(function(key, i){
        const portfolio = portfolios[key]
        const name = portfolio.name
        let activePiece = null
        let active = false
        if (thus.props.selectedPortfolio === undefined || thus.props.selectedPortfolio === null){
          let activeKey = thus.getSelectedPortfolio()
          if (key == activeKey) {
            active = true
            activePiece = (
              <div className='activeTag' />
            )
          }
        }
        else if (key == thus.props.selectedPortfolio) {
          active = true
          activePiece = (
            <div className='activeTag' />
          )
        }
        let portfolioImage = classNames({
          'image': true,
          'selectedPortfolio': active,
          [`${portfolio.theme}`]: true
        })

        let portfolioJSX = (
          <div className='portfolio activePortfolio'>
            <div onClick={()=>{ {thus.props.setSelectedPortfolio(key)} {thus.getCoins(key)} }} className={portfolioImage}>
              <h3>{name}</h3>
                {activePiece}
            </div>
          </div>
        )
        portfolioList.push(portfolioJSX)
      })
      return portfolioList
    }
  }

  getCoins = (newSelectedPortfolioKey) => {
    dbRef.ref(`${this.props.updateID}/portfolios/${newSelectedPortfolioKey}/coins`).on('value', snap => {
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


  render(){

    return(
      <div className='dashboardComponent'>
        <div className='portfolioWrapper'>
          {this.portfolioGenerator()}
          <div className='portfolio' onClick={()=>{this.toggleNewPortfolioModal()}}>
            <div className='addPortfolio'>
              <Icon className='plusIcon' type="plus" />
            </div>
          </div>

          <Modal
            className='addPortfolioModal'
            visible={this.state.isNewPortfolioModalActive}
            title="New Portfolio"
            onOk={()=>{this.handleNewPortfolio()}}
            onCancel={()=>{this.toggleNewPortfolioModal()}}
            footer={[
              <Button onClick={()=>{this.toggleNewPortfolioModal()}} key="back">Cancel</Button>,
              <Button onClick={()=>{this.handleNewPortfolio()}} key="submit" type="primary"> Create </Button>,
            ]}
          >
          <Input placeholder="Name" onPressEnter={()=>{this.handleNewPortfolio()}} onChange={(e)=>{this.setState({newPortfolioName: e.target.value})}}/>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Gradients" key="1">
                {this.gradientGenerator()}
            </TabPane>
            <TabPane tab="Solid Colors" key="2">
              {this.colorGenerator()}
            </TabPane>
            <TabPane tab="Memes" key="3">
              {this.memeGenerator()}
            </TabPane>
          </Tabs>
        </Modal>
      </div>
      <Portfolio selected={this.state.activePortfolio} />

      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    updateID: state.user.uid,
    liveData: state.liveData,
    portfolios: state.portfolios,
    selectedPortfolio: state.selectedPortfolio
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setPortfolios: (payload) => dispatch(setPortfolios(payload)),
      setSelectedPortfolio: (payload) => dispatch(setSelectedPortfolio(payload)),
      setCoins: (payload) => dispatch(setCoins(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(mainDashboard)


/*

<div className='portfolio activePortfolio'>
  <div className='image image1'>
    <h3>Main</h3>
  </div>
</div>

<div className='portfolio activePortfolio'>
  <div className='image image2'>
    <h3>STI Dream</h3>
  </div>
</div>

<div className='portfolio activePortfolio'>
  <div className='image image3'>
    <h3>Sujiya</h3>
  </div>
</div>

*/
