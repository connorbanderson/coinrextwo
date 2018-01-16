import React, { Component } from 'react'
import '../styles/signup.css'
import { Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { firebaseApp } from '../firebase'


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
    return (
      <div className="signUpPage">
        <div className='signupWrapper'>
          <h1> Signup Page </h1>
          <Input onChange={(e)=>{this.setState({email: e.target.value})}} placeholder="email" />
          <Input onChange={(e)=>{this.setState({password: e.target.value})}} type='password' placeholder="password" />
          <div>{this.state.error.message}</div>
          <Button onClick={()=>{this.createNewEmailUser()}}>Sign Up</Button>
          <Link to='/login'>
            <Button>Already Have An Account? Login</Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Sigunup
