Anthill.form = {
    label : function(str) {
        var title = Anthill.base.t('form.'+str);
        return title || (typeof title).toUpperCase();
    },
    setLanguage : function(opts) {
        Anthill.base.setAppMode(opts.json.mode);
        return opts.json.language ?
            Anthill.base.setLangaugeCode(opts.json.language.short_name) :
            Anthill.html.warning({msg: opts.json.error});
    },
    checkDefaultData : function(opts) {
        var msg = {
            error: 406,
            desc: []
        },
        error = Anthill.base.t('error.status'),
        data = [
            'login',
            'language'
        ];
        Ext.each(data, function(x){
            if (Anthill.base.unDefined(opts.json[x])) {
                msg.desc.push(Anthill.form.label(x));
            }
        });
        if (msg.desc.length>0) {
            Anthill.html.warning({
                name: error[msg.error].msg,
                msg: msg.desc.join(', ')+Anthill.html.br+error[msg.error].desc,
                fn: function() {
//                    form.renderLoginForm();
                }
            });
        }
        return msg.desc.length==0;
    },
    removeSelf : function() {
        if (!Anthill.base.unDefined(Anthill.form.formWin)) {
            Anthill.form.formWin.destroy();
        }
    },
    renderField : function(opts) {
        var field = {
            fieldLabel: Anthill.form.label(opts.model+'_'+opts.field),
            name: opts.model+'['+opts.field+']',
            id: opts.model+'_'+opts.field
        };        
        switch(opts.type) {
            case 'input':
                field.inputType = opts.inputType || 'text';
                return new Ext.form.TextField(field);
                break;
            case 'checkbox':
                field.xtype = opts.type;
                return field;
                break;
        }
    },
    renderLoginForm : function() {
        Anthill.form.removeSelf();
        var name = Anthill.form.renderField({
            type: 'input',
            model: 'user',
            field: 'name'
        }),
        password = Anthill.form.renderField({
            type: 'input',
            model: 'user',
            field: 'password',
            inputType: 'password'
        }),
        checkbox = Anthill.form.renderField({
            type: 'checkbox',
            model: 'user',
            field: 'remember'
        });
        Anthill.form.formCallback = Anthill.login.loginAction;
        Anthill.form.formHTML = new Ext.FormPanel({
            url: Anthill.base.getURL('/login/signin/'),
            border: false,
            header: false,
            title: Anthill.base.t('form.login'),
            defaults: {xtype:'textfield'},
            items: [
                name,
                password,
                checkbox
            ]
        });
        Anthill.form.formWin = new Ext.Window({
            title: Anthill.form.label('guest'),
            width: 320,
            height: 155,
            bodyStyle: 'background-color:#fff; padding: 10px',
            items: [Anthill.form.formHTML],
            modal: true,
            closable: false,
            resizable: false,
            buttonAlign: 'center',
            buttons: [{
                text: Anthill.form.label('login'),
                id: 'user_login',
                handler: Anthill.ajax.sendFormData,
                scope: Anthill.form
            }]
        });
        Anthill.form.formWin.show();
    }
};