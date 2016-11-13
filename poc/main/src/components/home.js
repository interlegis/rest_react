//index.jsx

import React, { Component, PropTypes } from 'react';
import { AuthorizedComponent } from 'react-router-role-authorization';
import { logout } from '../containers/auth';
import Cookies from 'js-cookie';
import $ from 'jquery';

export default class Home extends  Component{
    static contextTypes =  {
      router: PropTypes.object.isRequired
    };

    constructor(props) {
     super(props);
     this.state = { user: [] };
     this.logoutHandler = this.logoutHandler.bind(this);
     this.loadUserData = this.loadUserData.bind(this);
   }

    componentDidMount() {
        this.loadUserData()
    }

    logoutHandler() {
        logout();
        this.context.router.push('/login/');
    }

    loadUserData() {
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
            method: 'GET',
            url: '/estoque_api/users/i/',
            datatype: 'json',
            headers: {
                'Authorization': "Token " + localStorage.token
            },
            success: function(res) {
                  this.setState({user: res});
            }.bind(this)
        })
    }
    render() {
        return (
            <div>
            <h1>Bem Vindo, {this.state.user.username}</h1>
            <button onClick={this.logoutHandler} className="btn btn-default">Sair</button>
            </div>
        )
    }
}
