var Cookies = require('js-cookie')

module.exports = {
    login: function(username, pass, cb) {
        if (localStorage.token) {
            if (cb) cb(true)
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token
                if (cb) cb(true)
            } else {
                if (cb) cb(false)
            }
        })
    },

    logout: function() {
        delete localStorage.token
    },

    loggedIn: function() {
        return !!localStorage.token
    },

    getToken: function(username, pass, cb) {
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
            type: 'POST',
            url: '/api-token-auth/',
            data: {
                username: username,
                password: pass
            },
            success: function(res){
                cb({
                    authenticated: true,
                    token: res.token
                })
            },
            error: function(e) {
              $("#nome").toggleClass("hidden");
            }
        })
    },
}
