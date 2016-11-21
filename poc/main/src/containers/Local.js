import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLocal, postLocal } from '../actions/index';
import TabelaLocal from '../components/TabelaLocal';
import AddLocal from './AddLocal';
import FilterData from './FilterData'
import Cookies from 'js-cookie';

class Local extends Component{
    constructor(props){
      super(props);
      this.state = {
        dados: '',
        renderData: ''
      }
      this.onNewProdut = this.onNewProdut.bind(this);
    }

    componentWillMount() {
      this.props.getLocal();
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        dados: nextProps.locais,
        renderData: nextProps.locais
      });
    }

    onNewProdut(data){
      this.props.postLocal(data);
      var locais = this.props.locais;
      data.id = Date.now()
      this.setState({
        dados: locais.concat([data]),
        renderData: locais.concat([data]),
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
          <AddLocal onLocalSubmit={this.onNewProdut}/>
          <FilterData onSearchSubmit={ (filteredData) => {this.setState({renderData: filteredData})} } data={this.state.dados} type={"local"}/>
          <TabelaLocal data={this.state.renderData} />
        </div>
      );
    }
}

function mapStateToProps(state) {
  return { locais: state.locais };
}

export default connect(mapStateToProps, { getLocal, postLocal })(Local);
