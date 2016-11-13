import { combineReducers } from 'redux';
import ProdutoReducer from './reducers_produto';

const rootReducer = combineReducers({
  produtos: ProdutoReducer
});

export default rootReducer;
