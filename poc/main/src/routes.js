import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './components/app';
import PageProdutos from './components/PageProduto';
import PageFornecedor from './components/PageFornecedor';
import Home from './components/home';
import Login from './containers/login';
import { loggedIn } from './containers/auth';
import NotFoundComponent from './components/notfound';

function requireAuth(nextState, replace) {
    if (!loggedIn()) {
        replace({
            pathname:'/login/',
            state: {nextPathname: '/'}
        })
    }
}

export default (
    <Route path="index" component={App}>
      <IndexRoute component={Home} onEnter={requireAuth} />
      <Route path="/login/" component={Login} />
      <Route authorize={['user','admin']} path="/produtos/" component={PageProdutos} onEnter={requireAuth} />
      <Route authorize={['fornecedor']} path="/fornecedores/" component={PageFornecedor} onEnter={requireAuth} />
      <Route path="/not-found" component={NotFoundComponent}/>
    </Route>
);
