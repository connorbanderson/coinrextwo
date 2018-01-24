import React, { Component } from 'react';
import '../styles/loading.css'
import TopBar from './loginTopBar'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class loadingSection extends Component {

  constructor(props){
    super(props)
    this.state = {
      topBarShouldHaveBackground: false
    }
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = (e) =>{
    let scrollPosition = window.scrollY
    if (scrollPosition >= 100){
      this.setState({topBarShouldHaveBackground: true})
    } else {
      this.setState({topBarShouldHaveBackground: false})
    }
  }

  render(){
    if (this.props.authed){
      return (
        <Redirect to="/dashboard" push />
      )
    } else {
      return(
        <div className='entireLandingPage'>
          <div className='fullPage'>
            <TopBar topBarShouldHaveBackground={this.state.topBarShouldHaveBackground}/>
            <img className='landingLogo' src='/landingSVG.svg' />
            <img className='landingBackground' />
            <div className='purpleCircle'>
              <i className="fa fa-angle-down" aria-hidden="true" />
            </div>
          </div>

          <div className='landingSection landingSection2'>
              Section 2
          </div>

          <div className='landingSection landingSection3'>
              Section 3
          </div>

          <div className='landingSection landingSection4'>
              Section 4
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


export default connect(mapStateToProps, null)(loadingSection)
