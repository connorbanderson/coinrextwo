import React, { Component } from 'react';
import { Input } from 'antd'
import { firebaseApp } from '../firebase'
import { connect } from 'react-redux'


class market extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }


  componentDidMount(){
    console.log('MARKET HERE!!!!!!!!!!');
  }



  render(){
    return(
      <div className='dashboardComponent'>
        <h1> Market </h1>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    updateID: state.user.uid,
    liveData: state.liveData
  }
}

export default connect(mapStateToProps, null)(market)
