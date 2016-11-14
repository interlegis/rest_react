import $ from 'jquery';
import Cookies from 'js-cookie';
import axios from 'axios';

export const PRODUTOS_GET = 'PRODUTOS_GET';
export const PRODUTOS_POST = 'PRODUTOS_POST';
export const FORNECEDORES_GET = 'FORNECEDORES_GET';

const config = {
  headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      'Authorization': "Token " + localStorage.token
  }
}

export function getProdutos(){
   const request = axios.get('/estoque_api/produtos/', config);
   return{
      type: PRODUTOS_GET,
      payload: request
    };
}

export function postProduto(props) {
  const request = axios.post('/estoque_api/produtos/',props,config);
  return{
     type: PRODUTOS_POST,
     payload: request
   };
}

export function getFornecedores(props) {
  const request = axios.get('/estoque_api/fornecedores/',config);
  return{
     type: FORNECEDORES_GET,
     payload: request
   };
}
