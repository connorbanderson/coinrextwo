import { SET_PORTFOLIOS, LOG_OUT } from '../constants'

const nullPortfolios = null

export function portfolios(state = nullPortfolios, action){
  switch (action.type) {
    case SET_PORTFOLIOS:
      console.log('Hitting Reducer', action.payload);
      let portfolios = action.payload
      return portfolios
    case LOG_OUT:
      return nullPortfolios
    default:
      return state
  }
}
