import { combineReducers } from 'redux'
import { items, itemsHasErrored, itemsIsLoading } from './coins'

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading
})
