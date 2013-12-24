Anthill.login = {
    loginTimeout : 1200000,
    loginCheckDuration : 3000,
    logginErrorStatus: 401,
    loginObserver : function() {
        Anthill.ajax.load({
            url: Anthill.base.getURL('/login/login_observer/'),
            callback: Anthill.login.checkLogout,
            timestamp: Anthill.login.timeStamp
        });
    },
    checkLogout : function(opts) {
        var timeStamp = Anthill.login.getTimeStamp();
        if (Anthill.login.loginTimeout < timeStamp-Anthill.login.timeStamp ||
            Anthill.base.isNull(opts.json.login)) {
            clearInterval(Anthill.login.logoutObserver);
            Anthill.login.logout();
        }
    },
    signOut : function(opts) {
        Anthill.layout.destroyLayout();
        Anthill.form.renderLoginForm(opts);
    },
    getTimeStamp : function() {
        return new Date().getTime();
    },
    setTimeStamp : function(ms) {
         Anthill.login.timeStamp =  Anthill.login.getTimeStamp();
    },
    logoutAction : function(opts) {
         Anthill.login.setTimeStamp();
        if (Anthill.base.appMode !== 'development') {
             Anthill.login.logoutObserver = setInterval(
                 Anthill.login.loginObserver,
                 Anthill.login.loginCheckDuration
            );
        }
        Anthill.form.removeSelf();
        Anthill.layout.viewLayout();
    },
    loginAction : function(opts) {
        if(!Anthill.base.unDefined(Anthill.form.setLanguage(opts))) {
            if (Anthill.base.isNull(opts.json.login)) {
                Anthill.base.unDefined(opts.json.error) ?
                    Anthill.form.renderLoginForm() :
                    Anthill.html.warning({
                        status:  Anthill.login.logginErrorStatus,
                        msg:    opts.json.error,
                        body:   Anthill.ajax.errorStatus( Anthill.login.logginErrorStatus).desc
                    });
            } else {
                 Anthill.login.logoutAction(opts);
            }
        }
    },
    logout : function(action) {
        action = Anthill.base.define(action, 'true');
        Anthill.ajax.load({
            url: Anthill.base.getURL('/login/signout/'),
            params: {logout: action},
            callback: Anthill.login.signOut
        });
    },
    exit : function() {
        Anthill.login.logout('false');
    }
};