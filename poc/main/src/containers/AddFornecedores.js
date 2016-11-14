import React, { Component } from 'react';
import { RoleAwareComponent } from 'react-router-role-authorization';
import Cookies from 'js-cookie';

export default class AddFornecedores extends RoleAwareComponent{
    constructor(props){
      super(props);
      this.state = {
        nome: '',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.allowedRoles = ['admin'];
      this.userRoles = [Cookies.get('roles')];
    }

    handleSubmit(e) {
      e.preventDefault();
      var nome = this.state.nome.trim();
      if (!nome) {
        return;
      }
      this.props.onFornecedorSubmit({nome: nome});
      this.setState({nome: ''});
    }

  render() {
    const AdicionaFornecedor =  (
      <div className="col-md-4 col-md-offset-4">
        <h3>Adiciona Fornecedores</h3>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <input className="form-control" type="text" placeholder="Nome" value={this.state.nome} onChange={ (event) => this.setState({nome: event.target.value})}/>
          <input className="btn btn-default" type="submit" value="Enviar" />
        </form>
      </div>
    );

    return this.rolesMatched() ? AdicionaFornecedor : null;
  }
}
