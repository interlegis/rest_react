import React, { Component } from 'react';

export default class TabelaLocal extends Component{
  render() {
    console.log(this.props.data);
    if (!this.props.data) {
      return (
        <div>Loading...</div>
      );
    }
    var itensTabela = this.props.data.map( function(fornecedor) {
      return (
        <tr key={`${fornecedor.nome}${fornecedor.estado}`}>
          <td>{fornecedor.nome}</td>
          <td>{fornecedor.cidade}</td>
          <td>{fornecedor.estado}</td>
          <td>{fornecedor.habitantes}</td>
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
                <th>Cidade</th>
                <th>Estado</th>
                <th>Habitantes</th>
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
