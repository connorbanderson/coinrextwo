import React, { Component } from 'react'
import '../styles/login.css'
import { Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { firebaseApp } from '../firebase'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Topbar from '../components/loginTopBar.js'

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  loginUser = () =>{
    const { email, password } = this.state
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
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
      return (
        <div className="LoginPage text-center">
          <Topbar/>
          <div className='loginWrapper'>
            <h1 className='m20'> Login </h1>
            <div className='block'>
              <Input className='m10' eonPressEnter={()=>{this.loginUser()}} onChange={(e)=>{this.setState({email: e.target.value})}} placeholder="email" required />
              <Input className='m10' onPressEnter={()=>{this.loginUser()}} onChange={(e)=>{this.setState({password: e.target.value})}} type='password' placeholder="password" required/>
            </div>
            <small className='text-warning block'>{this.state.error.message}</small>
            <Button className='mt20' onClick={()=>{this.loginUser()}}>Log In</Button>
            <Link to='/signup'>
              <label className='block mt10'><small>Don't Have an Account?</small></label>
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state){
  console.log('Login MapStateToProps. State is...', state)
  const isAuthed = state.user.email == null ? false : true
  return {
    authed: isAuthed
  }
}


export default connect(mapStateToProps, null)(Login)
