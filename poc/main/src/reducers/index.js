import { combineReducers } from 'redux';
import ProdutoReducer from './reducers_produto';
import FornecedorReducer from './reducers_fornecedores';

const rootReducer = combineReducers({
  produtos: ProdutoReducer,
  fornecedores: FornecedorReducer
});

export default rootReducer;
