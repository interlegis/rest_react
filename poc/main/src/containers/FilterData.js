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
        switch (this.props.type) {
          case "fornecedores":
            filterData = original_data.filter(function (filter) {
                return filter.nome.toString().toLowerCase().indexOf(chave.toString().toLowerCase()) !== -1;
            });
          break;
          case "produtos":
            filterData = original_data.filter(function (filter) {
                return filter.nome.toString().toLowerCase().indexOf(chave.toString().toLowerCase()) !== -1 || filter.valor.toString().toLowerCase().indexOf(chave.toString().toLowerCase()) !== -1;
            });
          break;
          case "local":
            filterData = original_data.filter(function (filter) {
                return filter.nome.toString().toLowerCase().indexOf(chave.toString().toLowerCase()) !== -1 || filter.cidade.toString().toLowerCase().indexOf(chave.toString().toLowerCase()) !== -1;
            });
          break;
        }
      }
      console.log(filterData);
      this.props.onSearchSubmit(filterData);
    }

    render() {
      return (
        <div className="col-md-4 col-md-offset-4">
          <h3>Busca</h3>
          <input className="form-control" type="text" placeholder="Search..." ref="searchRef" defaultValue="" onChange={ (event) => this.getRows(event.target.value)}/>
        </div>
      );
    }
}
