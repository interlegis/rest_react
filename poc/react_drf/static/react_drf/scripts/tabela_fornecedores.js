var ListaProdutos = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleFornecedoresSubmit: function(produto) {
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
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="col-md-10">
        <h1>Lista de Fornecedores</h1>
        <AddFornecedores onProdutoSubmit={this.handleFornecedoresSubmit}/>
        <Tabela data={this.state.data} />
      </div>
    );
  }
});

  var Tabela = React.createClass({
    render: function() {
      var itensTabela = this.props.data.map(function(produto) {
        return (
          <LinhaTabela nome={produto.nome}>
          </LinhaTabela>
        );
      });
      return (
        <table className="table-bordered table">
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {itensTabela}
        </tbody>
        </table>
      );
    }
  });
  // tutorial4.js
  var LinhaTabela = React.createClass({
    render: function() {
      return (
        <tr className="comment">
          <td className="commentAuthor">
            {this.props.nome}
          </td>
        </tr>
      );
    }
  });

    var AddFornecedores = React.createClass({
      getInitialState: function() {
        return {nome: ''};
      },
      handleNomeChange: function(e) {
        this.setState({nome: e.target.value});
      },
      handleSubmit: function(e) {
        e.preventDefault();
        var nome = this.state.nome.trim();
        if (!nome) {
          return;
        }
        this.props.onProdutoSubmit({nome: nome});
        this.setState({nome: ''});
      },
    render: function() {
      return (
        <form className="form-group" onSubmit={this.handleSubmit}>
          <input className="form-control" type="text" placeholder="Nome" value={this.state.nome} onChange={this.handleNomeChange}/>
          <input className="btn btn-default" type="submit" value="Enviar" />
        </form>
      );
    }
  });


  ReactDOM.render(
    <ListaProdutos url="/estoque_api/fornecedores/?format=json" pollInterval={500}/>,
    document.getElementById('react-app')
  );
