import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './components/app';
import PageProdutos from './components/PageProduto';
import PageFornecedor from './components/PageFornecedor';
import PageLocal from './components/PageLocal';
import Home from './components/home';
import PagePdf from './components/PagePdf';
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
      <Route authorize={['fornecedor','admin']} path="/fornecedores/" component={PageFornecedor} onEnter={requireAuth} />
      <Route authorize={['admin','user','fornecedor']} path="/local/" component={PageLocal} onEnter={requireAuth} />
      <Route authorize={['admin','user','fornecedor']} path="/pdfview/" component={PagePdf} onEnter={requireAuth} />
      <Route path="/not-found" component={NotFoundComponent}/>
    </Route>
);
