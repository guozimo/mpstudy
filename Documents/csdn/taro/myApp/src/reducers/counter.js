import { ADD, MINUS,PLUGS2 } from '../constants/counter'

const INITIAL_STATE = {
  num: 0
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
     case MINUS:
       return {
         ...state,
         num: state.num - 1
       }
    case PLUGS2:
      return {
        ...state,
        num: state.num + 2
      }
     default:
       return state
  }
}
