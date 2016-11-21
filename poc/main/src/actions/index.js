import $ from 'jquery';
import Cookies from 'js-cookie';
import axios from 'axios';

export const PRODUTOS_GET = 'PRODUTOS_GET';
export const PRODUTOS_POST = 'PRODUTOS_POST';
export const FORNECEDORES_GET = 'FORNECEDORES_GET';
export const FORNECEDORES_POST = 'FORNECEDORES_POST';
export const LOCAL_POST = 'LOCAL_POST';
export const LOCAL_GET = 'LOCAL_GET';

const config = {
  headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      'Authorization': "Token " + localStorage.token
  }
}

export function getProdutos(){
   const request = axios.get('/api/produtos/', config);
   return{
      type: PRODUTOS_GET,
      payload: request
    };
}

export function postProduto(props) {
  const request = axios.post('/api/produtos/',props,config);
  return{
     type: PRODUTOS_POST,
     payload: request
   };
}

export function getFornecedores() {
  const request = axios.get('/api/fornecedores/',config);
  return{
     type: FORNECEDORES_GET,
     payload: request
   };
}

export function postFornecedores(props) {
  const request = axios.post('/api/fornecedores/',props,config);
  return{
     type: FORNECEDORES_POST,
     payload: request
   };
}

export function getLocal() {
  const request = axios.get('/api/local/',config);
  return{
     type: LOCAL_GET,
     payload: request
   };
}

export function postLocal(props) {
  const request = axios.post('/api/local/',props,config);
  return{
     type: LOCAL_POST,
     payload: request
   };
}
