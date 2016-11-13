//login.jsx
import React, { Component , PropTypes} from 'react';
import { login, loggedIn } from './auth';

export default class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      user: '',
      pass: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.refs);
        var username = this.state.user;
        var pass = this.state.pass;
        login(username, pass, (loggedIn) => {
            if (loggedIn) {
                this.context.router.replace('/index')
            }
        })
    }

    render() {
        return (
          <div className="col-md-3">
            <form onSubmit={this.handleSubmit} className="form-group">
                <input type="text" placeholder="Usuario" className="form-control" value={this.state.user} onChange={ (event) => this.setState({user: event.target.value})}/>
                <input type="password" placeholder="Senha" className="form-control" value={this.state.pass} onChange={ (event) => this.setState({pass: event.target.value})}/>
                <input type="submit" className="btn btn-default"/>
                <p className="hidden" id="nome">Erro Senha Invalida</p>
            </form>
          </div>
        )
    }
}
