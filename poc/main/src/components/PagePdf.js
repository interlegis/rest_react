import React, { Component } from 'react';
import PdfView from './pdfView';
import FileInput from 'react-file-input';
import { getPdf,postPdf } from '../actions/index';
import { connect } from 'react-redux';
import FileReaderInput from 'react-file-reader-input';

class PagePdf extends Component{
  constructor(props){
    super(props);
    this.state = {
      file: '',
      linkpdf: 'http://127.0.0.1:8000/media/pdf/luisa_resumo_2_29GGg5k.pdf'
    }
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.PreviewPdf = this.PreviewPdf.bind(this);
  }

  componentWillMount() {
    this.props.getPdf();
  }

  onSubmitForm(e){
      e.preventDefault();
      const file = this.state.file;
      const data = new FormData();
      data.append('nome',file.name);
      data.append('pdf', file);
      this.props.postPdf(data);
  }

  PreviewPdf(link_text,event){
    event.preventDefault();
    this.setState({
      linkpdf: link_text
    });
  }

  render(){
    if (!this.props.pdfs) {
      return(
        <div>Loading</div>
      );
    }
    var itensTabela = this.props.pdfs.map( function(file) {
      return (
        <tr key={`${file.nome}${file.pdf}`}>
          <td>
            <a onClick={(event) => this.PreviewPdf(file.pdf,event)} >{file.nome}</a>
          </td>
        </tr>
      );
    }.bind(this));
    return(
      <div>
        <div className="row col-md-3 col-lg-3 col-md-offset-1 col-lg-offset-1">
          <form onSubmit={this.onSubmitForm}>
            <input type="file" placeholder="Insira um pdf" onChange={this.handleChange} className="btn btn-sucess" onChange={ (event) => this.setState({file: event.target.files[0]}) } />
            <input className="btn btn-danger" type="submit" value="Enviar"/>
          </form>
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
        </div>
        <div className="row col-md-6 col-lg-6">
          <PdfView urlPdf={this.state.linkpdf} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { pdfs: state.pdfs }
}


export default connect(mapStateToProps, { getPdf, postPdf })(PagePdf);
