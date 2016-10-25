//index.jsx

var React = require('react')
var auth = require('./auth')
var Cookies = require('js-cookie')

module.exports = React.createClass({
   getInitialState: function() {
        return {user:[]}
    },

    componentDidMount: function() {
        this.loadUserData()
    },

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    logoutHandler: function() {
        auth.logout()
        this.context.router.replace('/index/login/')
    },

    loadUserData: function() {
      function csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken",  Cookies.get('csrftoken'));
                }
            }
        });
        $.ajax({
            method: 'GET',
            url: '/estoque_api/users/i/',
            datatype: 'json',
            headers: {
                'Authorization': "Token " + localStorage.token
            },
            success: function(res) {
                  this.setState({user: res});
            }.bind(this)
        })
    },
    render: function() {
        return (
            <div>
            <h1>Bem Vindo, {this.state.user.username}</h1>
            <button onClick={this.logoutHandler} className="btn btn-default">Sair</button>
            </div>
        )
    }
})
