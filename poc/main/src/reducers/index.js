import { combineReducers } from 'redux';
import ProdutoReducer from './reducers_produto';
import FornecedorReducer from './reducers_fornecedores';
import LocalReducer from './reducers_local'

const rootReducer = combineReducers({
  produtos: ProdutoReducer,
  fornecedores: FornecedorReducer,
  locais: LocalReducer
});

export default rootReducer;
