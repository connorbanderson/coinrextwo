import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import '../styles/dashboard.css'
import { Button, Input } from 'antd'
import { setLiveData } from '../actions'
import $ from 'jquery'

// Components
import CoinList from '../components/coinList'
import Loading from '../components/loading'
import TopBar from '../components/topBar'
import SideBar from '../components/sideBar'

import Market from '../components/market'
import MainDashboard from '../components/mainDashboard'


import { firebaseApp, portfolioListner } from '../firebase'

import { Select } from 'antd'
const Option = Select.Option

class Dashboard extends Component {

  constructor(props){
    super(props)
    this.state = {
      loading: true,
      newCoinName: null,
      newCoinAmntOwned: null,
      newCoinInitialInvestment: null,
      screenSizeTooSmall: true,
      height: 500,
      width: 500
    }
  }

  signOut = () =>{
    console.log('Signout being calllledddd')
    firebaseApp.auth().signOut()
  }

  componentDidMount(){
    this.getLiveData()
    setTimeout(function(){this.setState({loading: false})}.bind(this),1500)
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this))
  }

  updateDimensions() {
    let height = window.innerHeight
    let width = window.innerWidth
    this.setState({ height, width })
  }

   getLiveData = () => {
    return $.getJSON('https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=650')
      .then((data) => {
        let newObject = {}
        data.forEach(function(item){
          let tempObj = {[item.id]: item}
          Object.assign(newObject, tempObj)
        })
        this.props.setLiveData(newObject)
      })
  }


  render() {
    if (!this.props.authed){
      return (
        <Redirect to="/login" push />
      )
    }
    else if ( (this.state.height < 400) || (this.state.width < 320) ){
        let errorInfo = []
        if (this.state.height < 400){
          let height = (
            <div>
              <div className='subHeader'> Min Height: 400px</div>
              <div className='subHeader'> Currently {this.state.height}px </div>
            </div>
          )
          errorInfo.push(height)
        }
        if (this.state.width < 320) {
          let width = (
            <div>
              <div className='subHeader'> Min Width: 320px </div>
              <div className='subHeader'> Currently {this.state.width}px </div>
            </div>
          )
          errorInfo.push(width)
        }
      return(
          <div className='overlay'>
            <i className="fa fa-exclamation-triangle" aria-hidden="true" />
            <div className='header'>
              Screen Size Not Supported.
            </div>
            {errorInfo}
          </div>
      )
    }
    else if (this.state.loading || (this.props.liveData === null)){
      return(
        <Loading />
      )
    }
    else {
      return (
        <div className="dashboardPage themeBackgroundOne">
          <TopBar logout={()=>this.signOut()}/>
          <div className='dashboardBody'>
            <Switch>
              <Route exact path="/dashboard" component={MainDashboard} />
              <Route path="/dashboard/market" component={Market} />
            </Switch>
          </div>
        </div>
      )
    }
  }
}


function mapStateToProps(state, ownProps){
  const isAuthed = state.user.email == null ? false : true
  const specificid = ownProps.match.params.id
  console.log('SPecific ID!?!?!', specificid)
  return {
    authed: isAuthed,
    liveData: state.liveData,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setLiveData: (payload) => dispatch(setLiveData(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)


/*

<SideBar activeButton={this.props.location.pathname}/>

*/
