import React, { Component } from 'react';
import LinhaTabela from './RowTabela'

export default class Tabela extends Component{
  render() {
    if (this.props.data == null) {
      return (
        <div>
          Loading
        </div>
      );
    }
    var itensTabela = this.props.data.map( function(produto) {
      return (
        <LinhaTabela nome={produto.nome} key={`${produto.nome}${produto.valor}`}>
          {produto.valor}
        </LinhaTabela>
      );
    });
    return (
      <div className="col-md-10 col-md-offset-1">
          <h1>Lista de Produtos</h1>
          <table className="table-bordered table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {itensTabela}
            </tbody>
          </table>
      </div>
    );
  }
}
