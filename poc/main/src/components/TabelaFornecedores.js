import React, { Component } from 'react';

export default class TabelaFornecedores extends Component{
  render() {
    console.log(this.props.data);
    if (!this.props.data) {
      return (
        <div>Loading...</div>
      );
    }
    var itensTabela = this.props.data.map( function(fornecedor) {
      return (
        <tr key={fornecedor.nome}>
          <td>{fornecedor.nome}</td>
        </tr>
      );
    });
    return(
      <div className="col-md-4 col-md-offset-4">
          <h1>Lista de Fornecedores</h1>
          <table className="table-bordered table">
            <thead>
              <tr>
                <th>Nome</th>
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
