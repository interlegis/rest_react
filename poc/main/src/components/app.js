import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
              <ul className="nav navbar-nav">
                  <li><Link to="/index">Início</Link></li>
                  <li><Link to="/produtos/">Produtos</Link></li>
                  <li><Link to="/fornecedores/">Fornecedores</Link></li>
              </ul>
          </div>
        </nav>
        <div>
        {this.props.children}
      </div>
      </div>
    );
  }
}
