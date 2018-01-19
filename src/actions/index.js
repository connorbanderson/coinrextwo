import { SIGNED_IN, LOG_OUT, SET_COINS, SET_LIVE_DATA, SET_PORTFOLIOS, SET_SELECTED_PORTFOLIO } from '../constants'

const blankUser = {
  email: null,
  uid: null
}

export function logUser(payload){
  const action = {
    type: SIGNED_IN,
    payload
  }
  return action
}

export function logOut(){
  const action = {
    type: LOG_OUT,
    blankUser
  }
  return action
}

export function setCoins(payload){
  const action = {
    type: SET_COINS,
    payload
  }
  return action
}

export function setLiveData(payload){
  const action = {
    type: SET_LIVE_DATA,
    payload
  }
  return action
}

export function setPortfolios(payload){
  const action = {
    type: SET_PORTFOLIOS,
    payload
  }
  return action
}

export function setSelectedPortfolio(payload){
  console.log('COINLISTT - CALLING SET PORTFOLIO ACTION', payload);
  const action = {
    type: SET_SELECTED_PORTFOLIO,
    payload
  }
  return action
}
