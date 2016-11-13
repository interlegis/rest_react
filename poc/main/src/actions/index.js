import $ from 'jquery';
import Cookies from 'js-cookie';
import axios from 'axios';

export const PRODUTOS_GET = 'PRODUTOS_GET';
export const PRODUTOS_POST = 'PRODUTOS_POST';

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
