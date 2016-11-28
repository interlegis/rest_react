import { GET_PDF } from '../actions/index';

const INITIAL_STATE =  null;

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case GET_PDF:
      return action.payload.data;
    default:
      return state;
  }
}
