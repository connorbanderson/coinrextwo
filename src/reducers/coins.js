import { SET_COINS, LOG_OUT } from '../constants'

const nullCoins = []

export function coins(state = coins, action){
  switch (action.type) {
    case SET_COINS:
      console.log('Calling Set Coins Reducer', action.payload)
      let coinList = action.payload
      return coinList
    case LOG_OUT:
      return nullCoins
    default:
      return state
  }
}
