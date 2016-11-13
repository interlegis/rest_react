import Cookies  from 'js-cookie';
import $ from 'jquery';

export function login(username, pass, cb) {
        if (localStorage.token) {
            if (cb) cb(true)
            return
        }
        getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token
                if (cb) cb(true)
            } else {
                if (cb) cb(false)
            }
        })
  }

  export function logout(){
        Cookies.remove('name');
        delete localStorage.token
  }

  export function loggedIn(){
        return !!localStorage.token
  }

  function getToken(username, pass, cb) {
      function csrfSafeMethod(method) {
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
            type: 'POST',
            url: '/api-token-auth/',
            data: {
                username: username,
                password: pass
            },
            success: function(res){
              console.log(res.token);
              cb({
                  authenticated: true,
                  token: res.token
              })
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
                Cookies.set('username',res.username);
                Cookies.set('user',res.groups[0]);
              }
              });

            },
            error: function(e) {
              $("#nome").toggleClass("hidden");
            }
        })
  }