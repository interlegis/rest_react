import { PRODUTOS_GET } from '../actions/index';

const INITIAL_STATE =  null;

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case PRODUTOS_GET:
      return action.payload.data;
    default:
      return state;
  }
}
