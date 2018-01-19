import React, { Component } from 'react';
import '../styles/loading.css'



class loading extends Component {

  render(){
    return(
      <div className='fakeBody'>
        <div className='loadingScreen'>
          <img className='logo' src='/coinRexLogo.svg'></img>
            <h1 className='Loading-txt'>
                Loading...
            </h1>
        </div>
      </div>
    )
  }
}

export default loading
