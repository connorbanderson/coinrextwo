import React, { Component } from 'react'
import '../styles/login.css'
import { Input, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { firebaseApp } from '../firebase'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Topbar from '../components/loginTopBar.js'

import Loading from '../components/loading'

class SignUpLogin extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      },
      isLoading: true
    }
  }

  componentDidMount(){
    setTimeout(() => {this.setState({ isLoading: false }) }, 1000)
  }

  loginUser = () =>{
    const { email, password } = this.state
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({error})
      })
  }


  createNewEmailUser = () =>{
    const { email, password } = this.state
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({error})
      })
  }

  render() {
    if (this.props.authed){
      return (
        <Redirect to="/dashboard" push />
      )
    } else {
      let middleJSX = null
      if (this.props.specificURL[0] == 'login'){
        middleJSX = (
          <div className='loginWrapper'>
            <h1 className='m20'> Login </h1>
            <div className='block'>
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} className='m10' onPressEnter={()=>{this.loginUser()}} onChange={(e)=>{this.setState({email: e.target.value})}} placeholder="email" required />
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} className='m10' onPressEnter={()=>{this.loginUser()}} onChange={(e)=>{this.setState({password: e.target.value})}} placeholder="password" type='password' required/>
            </div>
            <small className='text-warning block'>{this.state.error.message}</small>
            <Button className='mt20' onClick={()=>{this.loginUser()}}>Log In</Button>
            <Link to='/signup'>
              <label className='block mt10'><small>`Don't Have an Account?`</small></label>
              <Button>Sign Up</Button>
            </Link>
          </div>
        )
      } else (
        middleJSX = (
          <div className='loginWrapper'>
            <h1 className='m20'> Sign up </h1>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} className='m10' onPressEnter={()=>{this.createNewEmailUser()}} onChange={(e)=>{this.setState({email: e.target.value})}} placeholder="email" />
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} className='m10' onPressEnter={()=>{this.createNewEmailUser()}} onChange={(e)=>{this.setState({password: e.target.value})}} type='password' placeholder="password" />
            <small className='text-warning block'>{this.state.error.message}</small>
            <Button className='mt20' onClick={()=>{this.createNewEmailUser()}}>Sign Up</Button>
            <Link to='/login'>
              <label  className='mt10 block'><small> Already Have An Account?</small></label>
              <Button> Login </Button>
            </Link>
          </div>
        )
      )
      return (
        <div className="LoginPage text-center">
          <Topbar/>
          {middleJSX}
          <img className='threeRex' src='/threeRex.svg'></img>
          <img className='landingBackground' />
        </div>
      )
    }
  }
}

function mapStateToProps(state, ownProps){
  const specificURL = ownProps.match.params
  const isAuthed = state.user.email == null ? false : true
  return {
    specificURL,
    authed: isAuthed
  }
}


export default connect(mapStateToProps, null)(SignUpLogin)
