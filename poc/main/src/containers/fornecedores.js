import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFornecedores, postFornecedores } from '../actions/index';
import TabelaFornecedores from '../components/TabelaFornecedores';
import FilterData from './FilterData';
import AddFornecedores from './AddFornecedores';
import Cookies from 'js-cookie';

class Fornecedores extends Component{
  constructor(props){
    super(props);

    this.state = ({
      dados: '',
      renderData: ''
    });
    this.onNewFornecedor = this.onNewFornecedor.bind(this);
  }

  componentWillMount() {
    this.props.getFornecedores();
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      dados: nextProps.fornecedores,
      renderData: nextProps.fornecedores
    });
  }

  onNewFornecedor(data){
    this.props.postFornecedores(data);
    var fornecedores = this.props.fornecedores;
    data.id = Date.now()
    this.setState({
      dados: fornecedores.concat([data]),
      renderData: fornecedores.concat([data]),
    });
  }

  render(){
      if (!this.state.dados) {
        return (
          <div className="col-md-12">
            Loading...
          </div>
        )
      }
      return(
        <div>
          <AddFornecedores onFornecedorSubmit={this.onNewFornecedor}/>
          <FilterData onSearchSubmit={ (filteredData) => {this.setState({renderData: filteredData})} } data={this.state.dados} type={"fornecedores"}  />
          <TabelaFornecedores data={this.state.renderData}/>
        </div>
      );
  }

}

function mapStateToProps(state) {
  return { fornecedores: state.fornecedores };
}

export default connect(mapStateToProps, { getFornecedores, postFornecedores })(Fornecedores);
