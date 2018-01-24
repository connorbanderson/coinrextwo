import React, { Component } from 'react';
import '../styles/topbar.css'
import { firebaseApp } from '../firebase'
import { Button } from 'antd'
import classNames from 'classnames'
import { Link } from 'react-router-dom'



class loginTopBar extends Component {



  render(){
    let topBarCustom = classNames({
      'topBarBackground': this.props.topBarShouldHaveBackground,
      'topBarTransparent': !this.props.topBarShouldHaveBackground,
      'topBarLanding': true
    })
    return(
      <div className={topBarCustom}>
        <Link to='/'>
          <img className='headLogo' src='/coinRexLogoHead2.svg' />
        </Link>
        <h1> CoinREX </h1>
        <div className='rightSide'>
          <Link to='/login'>
            <Button> Login </Button>
          </Link>
          <Link to='/signup'>
            <Button> Signup </Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default loginTopBar
