import { RECEIVE_DECKS, MODIFY_DECK } from '../actions'
import { combineReducers } from 'redux'

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case MODIFY_DECK :
      return {
        ...state,
        [action.title]: action.deck
      }
    default :
      return state
  }
}

export default combineReducers({
  decks
})
