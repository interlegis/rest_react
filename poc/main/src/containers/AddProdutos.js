import React, { Component } from 'react';
import { RoleAwareComponent } from 'react-router-role-authorization';
import Cookies from 'js-cookie';

export default class AddProdutos extends RoleAwareComponent{
    constructor(props){
      super(props);
      this.state = {
        nome: '',
        valor: ''
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.allowedRoles = ['admin'];
      this.userRoles = [Cookies.get('roles')];
    }

    handleSubmit(e) {
      e.preventDefault();
      var nome = this.state.nome.trim();
      var valor = this.state.valor.trim();
      if (!valor || !nome) {
        return;
      }
      this.props.onProdutoSubmit({nome: nome, valor: valor});
      this.setState({nome: '', valor: ''});
    }

  render() {
    const AdicionaProdutos =  (
      <div className="col-md-4 col-md-offset-4">
        <h3>Adicionar Produtos</h3>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <input className="form-control" type="text" placeholder="Nome" value={this.state.nome} onChange={ (event) => this.setState({nome: event.target.value})}/>
          <input className="form-control" type="number" placeholder="Valor" value={this.state.valor} onChange={(event) => this.setState({valor: event.target.value})}/>
          <input className="btn btn-default" type="submit" value="Enviar" />
        </form>
      </div>
    );

    return this.rolesMatched() ? AdicionaProdutos : null;
  }
}
