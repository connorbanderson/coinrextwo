import { SET_SELECTED_PORTFOLIO, LOG_OUT } from '../constants'

const nullSelectedPortfolio = null

export function selectedPortfolio(state = nullSelectedPortfolio, action){
  switch (action.type) {
    case SET_SELECTED_PORTFOLIO:
      console.log('COINLISTT -- SET_SELECTED_PORTFOLIO Reducer', action.payload);
      let selectedPortfolio = action.payload
      return selectedPortfolio
    case LOG_OUT:
      return nullSelectedPortfolio
    default:
      return state
  }
}
