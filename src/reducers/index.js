import { combineReducers } from 'redux'
import { coins } from './coins'
import { user } from './user'
import { liveData } from './liveData'
import { portfolios } from './portfolios'
import { selectedPortfolio } from './selectedPortfolio'


export default combineReducers({
  coins,
  user,
  liveData,
  portfolios,
  selectedPortfolio
})
