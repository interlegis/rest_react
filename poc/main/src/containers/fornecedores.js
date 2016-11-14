import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFornecedores } from '../actions/index';
import Cookies from 'js-cookie';

class Fornecedores extends Component{
  componentWillMount() {
    this.props.getFornecedores();
  }

  render(){
      if (!this.props.fornecedores) {
        return (
          <div>Loading...</div>
        );
      }
      var itensTabela = this.props.fornecedores.map( function(fornecedor) {
        return (
          <tr key={fornecedor.nome}>
            <td>{fornecedor.nome}</td>
          </tr>
        );
      });
      return(
        <div className="col-md-10 col-md-offset-1">
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

function mapStateToProps(state) {
  return { fornecedores: state.fornecedores };
}

export default connect(mapStateToProps, { getFornecedores })(Fornecedores);
