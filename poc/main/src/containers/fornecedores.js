import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFornecedores } from '../actions/index';
import TabelaFornecedores from '../components/TabelaFornecedores'
import FilterData from '../containers/FilterData'
import Cookies from 'js-cookie';

class Fornecedores extends Component{
  constructor(props){
    super(props);

    this.state = ({
      dados: '',
      renderData: ''
    });

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
          <h3>Busca Fornecedores</h3>
          <FilterData onSearchSubmit={ (filteredData) => {this.setState({renderData: filteredData})} } data={this.state.dados} type={"fornecedores"}  />
          <TabelaFornecedores data={this.state.renderData}/>
        </div>
      );
  }

}

function mapStateToProps(state) {
  return { fornecedores: state.fornecedores };
}

export default connect(mapStateToProps, { getFornecedores })(Fornecedores);
