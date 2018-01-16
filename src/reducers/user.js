import { SIGNED_IN, LOG_OUT } from '../constants'

const nullUser = {
  email: null,
  uid: null
}

export function user(state = nullUser, action){
  switch (action.type) {
    case SIGNED_IN:
      user = {
        email: action.payload.email,
        uid: action.payload.uid
      }
      return user
    case LOG_OUT:
      return nullUser
    default:
      return state
  }
}
