import React from 'react';
import Produto from '../containers/produtos';
import { AuthorizedComponent } from 'react-router-role-authorization';
import Cookies from 'js-cookie';

class PageProdutos extends AuthorizedComponent {
  constructor(props) {
    super(props);

    this.userRoles = [Cookies.get('roles')];
    console.log(this.userRoles);
    this.notAuthorizedPath = '/not-found';
  }

  render() {
    return (
      <div>
        <Produto />
      </div>
    );
  }
}

export default PageProdutos;
