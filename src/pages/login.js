import React, { Component } from 'react'
import '../styles/login.css'
import { Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { firebaseApp } from '../firebase'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

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
        <div className="LoginPage">
          <div className='loginWrapper'>
            <h1> Login Page </h1>
            <Input onPressEnter={()=>{this.loginUser()}} onChange={(e)=>{this.setState({email: e.target.value})}} placeholder="email" />
            <Input onPressEnter={()=>{this.loginUser()}} onChange={(e)=>{this.setState({password: e.target.value})}} type='password' placeholder="password" />
            <Button onClick={()=>{this.loginUser()}}>Log In</Button>
            <div>{this.state.error.message}</div>
            <Link to='/signup'>
              <Button>Don't Have an Account? Sign Up</Button>
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
