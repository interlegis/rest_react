import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './components/app';
import Produtos from './containers/produtos';
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
    <Router path="index" component={App}>
      <IndexRoute component={Home} onEnter={requireAuth} />
      <Route path="/login/" component={Login} />
      <Route path="/produtos/" component={Produtos} onEnter={requireAuth} authorize={['2']} />
      <Route path="/notfound/" component={NotFoundComponent}/>
    </Router>
);
