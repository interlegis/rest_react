import { combineReducers } from 'redux';
import ProdutoReducer from './reducers_produto';
import FornecedorReducer from './reducers_fornecedores';
import LocalReducer from './reducers_local'
import ArquivoReducer from './reducers_arquivo'

const rootReducer = combineReducers({
  produtos: ProdutoReducer,
  fornecedores: FornecedorReducer,
  locais: LocalReducer,
  pdfs: ArquivoReducer
});

export default rootReducer;
