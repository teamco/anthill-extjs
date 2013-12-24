Anthill.action = {
    getSelectedParams : function(opts) {
        var params = [];
        Ext.each(opts.selected, function(){
            params.push({
                id:    this.id,
                title: '['+this.json.status+'], '+this.json.title
            });
        });
        return params;
    },
    handler : {
        renderIcon : function(icon) {
            var src = icon?'accept':'error_logs';
            return '<img src="/images/icons/'+src+'.png" alt="'+src+'" />';
        },
        showUserLog : function(opts) {
            Anthill.ajax.load({
                url: Anthill.base.getURL('/user_logs/show/', Anthill.action.getSelectedParams(opts)[0].id),
                title: Anthill.base.t('loader.load'),
                callback: Anthill.html.showUserLog
            });
        },
        errorFix : function(opts) {
            var params = Anthill.action.getSelectedParams(opts),
                ids = [], titles = [];
            Ext.each(params, function(){
                ids.push(this.id);
                titles.push('ID: '+this.id+' '+this.title)
            });
            Anthill.ajax.load({
                url: Anthill.base.getURL('/error_logs/fix/'),
                params: {data: Ext.util.JSON.encode(params)},
                title: Anthill.base.t('loader.load')+Anthill.html.br+titles.join(Anthill.html.br),
                callback: Anthill.data.gridTools.error_logs.refresh.handler
            });
        },
        addNewItem : function(opts) {
            console.log('addNewItem', opts);
        },
        logout : function() {
            Anthill.html.handleLogout({
                title: Anthill.base.t('messageBox.logoutTitle'),
                msg:   Anthill.base.t('messageBox.logoutMsg'),
                fn:    Anthill.login.logout
            });
        },
        exit : function() {
            Anthill.html.handleLogout({
                title: Anthill.base.t('messageBox.exitTitle'),
                msg:   Anthill.base.t('messageBox.exitMsg'),
                fn:    Anthill.login.exit
            });
        }
    }
};