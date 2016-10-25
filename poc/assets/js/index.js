var React = require('react')
var ReactDOM = require('react-dom')
var Cookies = require('js-cookie')

var ListaProdutos = React.createClass({
    loadProdutosFromServer: function(){
        $.ajax({
            url: this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
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
      this.setState({data: newProdutos});
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: produto,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadProdutosFromServer();
        setInterval(this.loadProdutosFromServer,this.props.pollInterval)
    },
    render: function() {
      return (
        <div className="col-md-12">
          <h1>Lista de Produtos</h1>
          <AddProdutos onProdutoSubmit={this.handleProdutoSubmit}/>
          <Tabela data={this.state.data} />
        </div>
      );
    }
});

  var Tabela = React.createClass({
    render: function(data) {
      var itensTabela = this.props.data.map(function(produto) {
        return (
          <LinhaTabela nome={produto.nome}>
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


ReactDOM.render(<ListaProdutos url='/estoque_api/produtos/' pollInterval={200} />,
    document.getElementById('container'))
