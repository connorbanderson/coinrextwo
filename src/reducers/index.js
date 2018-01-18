import { combineReducers } from 'redux'
import { coins } from './coins'
import { user } from './user'
import { liveData } from './liveData'
import { portfolios } from './portfolios'


export default combineReducers({
  coins,
  user,
  liveData,
  portfolios
})
