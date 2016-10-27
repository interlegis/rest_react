//login.jsx

var React = require('react')
var auth = require('./auth')

module.exports = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    handleSubmit: function(e) {
        e.preventDefault()

        var username = this.refs.username.value
        var pass = this.refs.pass.value

        auth.login(username, pass, (loggedIn) => {
            if (loggedIn) {
                this.context.router.replace('/index/')
            }
        })
    },

    render: function() {
        return (
          <div className="col-md-3">
            <form onSubmit={this.handleSubmit} className="form-group">
                <input type="text" placeholder="Usuario" ref="username" className="form-control"/>
                <input type="password" placeholder="Senha" ref="pass" className="form-control"/>
                <input type="submit" className="btn btn-default"/>
                <p className="hidden" id="nome">Erro Senha Invalida</p>
            </form>
          </div>
        )
    }
})
