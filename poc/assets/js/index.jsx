var React = require('react')
var ReactDOM = require('react-dom')
var Router = require('react-router')
var App = require('./app')
var Login = require('./login')
var auth = require('./auth')
var Application = require('./application.jsx')

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname:'/index/login/',
            state: {nextPathname: '/index/'}
        })
    }
}

ReactDOM.render(
    <Router.Router history={Router.browserHistory}>
        <Router.Route path='/index/login/' component={Login} />
        <Router.Route path='/index' component={App} onEnter={requireAuth} />
        <Router.Route path='/index/produtos' component={Application} onEnter={requireAuth} />
    </Router.Router>,
    document.getElementById('app')
)
