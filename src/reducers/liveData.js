
import { SET_LIVE_DATA, LOG_OUT } from '../constants'

const nullLiveData = null

export function liveData(state = nullLiveData, action){
  switch (action.type) {
    case SET_LIVE_DATA:
      let liveCoinList = action.payload
      return liveCoinList
    case LOG_OUT:
      return nullLiveData
    default:
      return state
  }
}
