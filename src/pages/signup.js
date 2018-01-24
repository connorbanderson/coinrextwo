import React, { Component } from 'react'
import '../styles/signup.css'
import { Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { firebaseApp } from '../firebase'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class Sigunup extends Component {

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

  createNewEmailUser = () =>{
    console.log('Here to Help')
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
      return (
        <div className="signUpPage text-center">
          <div className='signupWrapper'>
            <h1 className='m20'> Sign up </h1>
            <Input className='m10' onPressEnter={()=>{this.createNewEmailUser()}} onChange={(e)=>{this.setState({email: e.target.value})}} placeholder="email" />
            <Input className='m10' onPressEnter={()=>{this.createNewEmailUser()}} onChange={(e)=>{this.setState({password: e.target.value})}} type='password' placeholder="password" />
            <small className='text-warning block'>{this.state.error.message}</small>
            <Button className='mt20' onClick={()=>{this.createNewEmailUser()}}>Sign Up</Button>
            <Link to='/login'>
              <label  className='mt10 block'><small> Already Have An Account?</small></label>
              <Button> Login</Button>
            </Link>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state){
  const isAuthed = state.user.email == null ? false : true
  return {
    authed: isAuthed
  }
}


export default connect(mapStateToProps, null)(Sigunup)
