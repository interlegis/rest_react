import React from 'react';
import Fornecedores from '../containers/fornecedores';
import { AuthorizedComponent } from 'react-router-role-authorization';
import Cookies from 'js-cookie';

class PageFornecedor extends AuthorizedComponent {
  constructor(props) {
    super(props);

    this.userRoles = [Cookies.get('roles')];
    this.notAuthorizedPath = '/not-found';
  }

  render() {
    return (
      <div>
        <Fornecedores />
      </div>
    );
  }
}

export default PageFornecedor;
