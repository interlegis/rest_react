import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProdutos, postProduto } from '../actions/index';
import Tabela from '../components/Tabela';
import FilterData from './FilterData';
import AddProdutos from './AddProdutos';
import Cookies from 'js-cookie';

class Produtos extends Component{
    constructor(props){
      super(props);
      this.state = {
        dados: '',
        renderData: ''
      }
      this.onNewProdut = this.onNewProdut.bind(this);
    }

    componentWillMount() {
      this.props.getProdutos();
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        dados: nextProps.produtos,
        renderData: nextProps.produtos
      });
    }

    onNewProdut(data){
      this.props.postProduto(data);
      var produtos = this.props.produtos;
      data.id = Date.now()
      this.setState({
        dados: produtos.concat([data]),
        renderData: nextProps.produtos
      });
    }

    render() {
      if (!this.state.dados) {
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
          <FilterData onSearchSubmit={ (filteredData) => {this.setState({renderData: filteredData})} } data={this.state.dados} type={"produtos"}/>
          <Tabela data={this.state.renderData} />
        </div>
      );
    }
}

function mapStateToProps(state) {
  return { produtos: state.produtos };
}

export default connect(mapStateToProps, { getProdutos, postProduto })(Produtos);
