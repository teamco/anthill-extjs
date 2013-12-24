Anthill.html = {
    nil : 'javascript:void(0)',
    br : '<br />',
    pre : function(pre) {
        return '<pre><code>'+pre+'</code></pre>';
    },
    spinner : function(opts) {
        var dom     = Anthill.base.unDefined(opts.region) ? Ext.getBody() : Ext.get(opts.region);
        opts.msg    = opts.msg || Anthill.base.t('loader');
        opts.loader = new Ext.LoadMask(
            dom, {
                msg: opts.msg,
                removeMask: true
            }
        );
        return opts.loader;
    },
    handleLogout : function(opts) {
        Ext.Msg.confirm(opts.title, opts.msg, function(btn){
            if(btn === 'yes'){
                Anthill.base.runCallback(opts);
            } else {}
        });
    },
    errorLess : function(opts) {
        Anthill.ajax.saveError('Error', opts);
        Ext.Msg.show({
           title:   opts.name,
           msg:     opts.msg+Anthill.html.br.loop(2)+'Show <a href="'+Anthill.html.nil+'" id="trace-error">stack</a>',
           buttons: Ext.Msg.OK,
           icon:    Ext.MessageBox.ERROR
        });
        Ext.get('trace-error').on('click', function(){
            Anthill.html.errorMore(opts);
        });
    },
    warning : function(opts) {
        Anthill.ajax.saveError('Warning', opts);
        Ext.Msg.show({
           title:    opts.name || 'Warning',
           msg:      opts.msg,
           buttons:  Ext.Msg.OK,
           icon:     Ext.MessageBox.WARNING,
           closable: false,
           fn:       opts.fn || undefined
        });
    },
    errorMore : function(params) {
        var status    = new Ext.Toolbar.TextItem({id:'status',text:params.opts.title}),
            clock     = new Ext.Toolbar.TextItem({id:'clock',text:params.clock}),
            statusbar = new Ext.Toolbar({
                items:[
                    status,
                    '->','Status: '+params.opts.status.toString(),
                    '-',clock
                ]
            });
        this.failed = new Ext.Window({
            title: params.opts.statusText,
            width: 600,
            height: 450,
            maximizable: true,
            maskDisabled: true,
            autoScroll: true,
            modal: false,
            bbar: statusbar,
            padding: '10',
            bodyStyle: 'background-color:#fff;',
            html: params.opts.body
        });
        this.failed.show();
    },
    showUserLog : function(params) {
        var data      = params.json.data,
            clock     = new Ext.Toolbar.TextItem({id:'clock',text:data.updated_at}),
            statusbar = new Ext.Toolbar({
                items:[
                    'User: '+data.user_id,
                    '->','Status: '+data.status,
                    '-',clock
                ]
            });
        this.log = new Ext.Window({
            title: data.session_id,
            width: 600,
            height: 450,
            maximizable: true,
            maskDisabled: false,
            modal: true,
            autoScroll: true,
            bbar: statusbar,
            padding: '10',
            bodyStyle: 'background-color:#fff;',
            html: data.body
        });
        this.log.show();
    }
};