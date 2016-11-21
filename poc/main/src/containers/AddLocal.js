import React, { Component } from 'react';
import { RoleAwareComponent } from 'react-router-role-authorization';
import Cookies from 'js-cookie';

export default class AddProdutos extends RoleAwareComponent{
    constructor(props){
      super(props);
      this.state = {
        nome: '',
        cidade: '',
        estado: '',
        habitantes: ''
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.allowedRoles = ['admin'];
      this.userRoles = [Cookies.get('roles')];
    }

    handleSubmit(e) {
      e.preventDefault();
      var nome = this.state.nome.trim();
      var cidade = this.state.cidade.trim();
      var estado = this.state.estado.trim();
      var habitantes = this.state.habitantes.trim();
      if (!nome || !cidade || !estado || !habitantes) {
        return;
      }
      this.props.onLocalSubmit({nome: nome, cidade: cidade, estado: estado, habitantes: habitantes});
      this.setState({nome: '', cidade: '', estado: '', habitantes: ''});
    }

  render() {
    const AdicionarLocal =  (
      <div className="col-md-4 col-md-offset-4">
        <h3>Adicionar Locais</h3>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <input className="form-control" type="text" placeholder="Nome" value={this.state.nome} onChange={ (event) => this.setState({nome: event.target.value})}/>
          <input className="form-control" type="text" placeholder="Cidade" value={this.state.cidade} onChange={ (event) => this.setState({cidade: event.target.value})}/>
          <input className="form-control" type="text" placeholder="Estado" value={this.state.estado} onChange={ (event) => this.setState({estado: event.target.value})}/>
          <input className="form-control" type="number" placeholder="Habitantes" value={this.state.habitantes} onChange={(event) => this.setState({habitantes: event.target.value})}/>
          <input className="btn btn-default" type="submit" value="Enviar" />
        </form>
      </div>
    );

    return this.rolesMatched() ? AdicionarLocal : null;
  }
}
