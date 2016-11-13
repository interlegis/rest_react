import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProdutos, postProduto } from '../actions/index';
import Tabela from '../components/Tabela';
import FilterData from './FilterData';
import AddProdutos from './AddProdutos';
import { AuthorizedComponent } from 'react-router-role-authorization';
import Cookies from 'js-cookie';

class Produtos extends AuthorizedComponent{
    constructor(props){
      super(props);
      this.state = {
        produtos_filter: ''
      };
      this.userRoles = Cookies.get('user');
      this.notAuthorizedPath = '/not-found';
      this.onNewProdut = this.onNewProdut.bind(this);
    }

    componentWillMount() {
      this.props.getProdutos();
      this.setState({ produtos_filter: this.props.produtos });
    }

    onNewProdut(data){
      this.props.postProduto(data);
    }

    render() {
      if ((this.props.produtos ==  null) && (this.state.produtos_filter == null)) {
        return (
          <div className="col-md-12">
            Loading...
          </div>
        )
      }
      return (
        <div className="col-md-12">
          <h1>Lista de Produtos</h1>
          <AddProdutos onProdutoSubmit={this.onNewProdut}/>
          <FilterData onSearchSubmit={ (filterData) => this.setState({ produtos_filter: filterData})} data={this.props.produtos}/>
          <Tabela data={this.state.produtos_filter} />
        </div>
      );
    }
}

function mapStateToProps(state) {
  return { produtos: state.produtos };
}

export default connect(mapStateToProps, { getProdutos, postProduto })(Produtos);
