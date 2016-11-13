import React, { Component } from 'react';

export default class FilterData extends Component{
    constructor(props){
      super(props);
      this.getRows = this.getRows.bind(this);
    }

    getRows(chave){
      var filterData;
      if (!chave) {
        filterData = this.props.data;
      }else{
        var original_data = this.props.data;
        filterData = original_data.filter(function (filter) {
            return filter.nome.toString().toLowerCase().indexOf(chave.toString().toLowerCase()) !== -1 || filter.valor.toString().toLowerCase().indexOf(chave.toString().toLowerCase()) !== -1;;
        });
      }
      this.props.onSearchSubmit(filterData);
    }

    render() {
      return (
          <input className="form-control" type="text" placeholder="Search..." ref="searchRef" defaultValue="" onChange={ (event) => this.getRows(event.target.value)}/>
      );
    }
}
