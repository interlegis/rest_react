import React, { Component } from 'react';

export default class LinhaTabela extends Component{
  render() {
    return (
      <tr>
        <td>
          {this.props.nome}
        </td>
        <td>
          {this.props.children}
        </td>
      </tr>
    );
  }
}
