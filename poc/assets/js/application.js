var React = require('react')
var ReactDOM = require('react-dom')
var Cookies = require('js-cookie')

module.exports = React.createClass({
    loadProdutosFromServer: function(){
        function csrfSafeMethod(method) {
          // these HTTP methods do not require CSRF protection
          return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }
        $.ajaxSetup({
          beforeSend: function(xhr, settings) {
              if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                  xhr.setRequestHeader("X-CSRFToken",  Cookies.get('csrftoken'));
              }
          }
        });
        $.ajax({
            url: '/estoque_api/produtos/',
            method: 'GET',
            datatype: 'json',
            cache: false,
            headers: {
                'Authorization': "Token " + localStorage.token
            },
            success: function(dataGET) {
                this.setState({dataSearch: dataGET});
                this.setState({data: dataGET});
            }.bind(this)
        })
    },
    handleProdutoSubmit: function(produto) {
      function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
      }
      $.ajaxSetup({
          beforeSend: function(xhr, settings) {
              if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                  xhr.setRequestHeader("X-CSRFToken",  Cookies.get('csrftoken'));
              }
          }
      });
      var produtos = this.state.data;
      produto.id = Date.now();
      var newProdutos = produtos.concat([produto]);
      this.setState({dataSearch: newProdutos});
      $.ajax({
        url: '/estoque_api/produtos/',
        dataType: 'json',
        type: 'POST',
        data: produto,
        headers: {
            'Authorization': "Token " + localStorage.token
        },
        success: function(dataPOST) {
          this.loadProdutosFromServer();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    handleFilterData: function (data) {
      this.setState({dataSearch: data});
    },
    getInitialState: function() {
        return {data: [],dataSearch: []};
    },
    componentDidMount: function() {
        this.loadProdutosFromServer();
    },
    render: function() {
      return (
        <div className="col-md-12">
          <h1>Lista de Produtos</h1>
          <AddProdutos onProdutoSubmit={this.handleProdutoSubmit}/>
          <FilterData onSearchSubmit={this.handleFilterData} data={this.state.data}/>
          <Tabela data={this.state.dataSearch} />
        </div>
      );
    }
});

var FilterData = React.createClass({
    getRows: function(chave){
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
    },
    handleKeyChange: function(e) {
      this.getRows(this.refs.searchRef.value);
    },
    render: function() {
      return (
          <input className="form-control" type="text" placeholder="Search..." ref="searchRef" defaultValue="" onChange={this.handleKeyChange}/>
      );
    }
});

  var Tabela = React.createClass({
    render: function() {
      var itensTabela = this.props.data.map( function(produto) {
        return (
          <LinhaTabela nome={produto.nome} key={produto.nome}>
            {produto.valor}
          </LinhaTabela>
        );
      });
      return (
        <div className="col-md-12">
            <h1>Lista de Produtos</h1>
            <table className="table-bordered table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {itensTabela}
              </tbody>
            </table>
        </div>
      );
    }
});

var LinhaTabela = React.createClass({
  render: function() {
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
});

  var AddProdutos = React.createClass({
      getInitialState: function() {
        return {nome: '', valor: ''};
      },
      handleNomeChange: function(e) {
        this.setState({nome: e.target.value});
      },
      handleValorChange: function(e) {
        this.setState({valor: e.target.value});
      },
      handleSubmit: function(e) {
        e.preventDefault();
        var nome = this.state.nome.trim();
        var valor = this.state.valor.trim();
        if (!valor || !nome) {
          return;
        }
        this.props.onProdutoSubmit({nome: nome, valor: valor});
        this.setState({nome: '', valor: ''});
      },
    render: function() {
      return (
        <form className="form-group" onSubmit={this.handleSubmit}>
          <input className="form-control" type="text" placeholder="Nome" value={this.state.nome} onChange={this.handleNomeChange}/>
          <input className="form-control" type="number" placeholder="Valor" value={this.state.valor} onChange={this.handleValorChange}/>
          <input className="btn btn-default" type="submit" value="Enviar" />
        </form>
      );
    }
  });