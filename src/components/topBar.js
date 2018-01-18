import React, { Component } from 'react';
import '../styles/topbar.css'
import { firebaseApp } from '../firebase'
import { Button } from 'antd'



class topBar extends Component {



  render(){
    console.log('TopBARRRRRR', this.props);
    return(
      <div className='topBar'>
        <img className='headLogo' src='/coinRexLogoHead2.svg' />
        <h1> CoinREX </h1>
        <i className="fa fa-user-o" aria-hidden="true"></i>
        <Button onClick={()=>{this.props.logout()}} className='logoutButton'> Logout </Button>

      </div>
    )
  }
}

export default topBar
