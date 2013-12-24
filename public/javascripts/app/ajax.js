Anthill.ajax = {
    run: true,
    hash : function(opts) {
        return {
            method: opts.method || 'post',
            success: function(response, data){
                opts.json   = Anthill.ajax.decodeJSON(response) || data.result.json;
                opts.status = response.status || data.response.status;
                opts.data   = data;
                Anthill.ajax.handler(opts);
            },
            failure: function(response, data){
                opts.json   = response;
                opts.status = response.status;
                opts.data   = data;
                Anthill.ajax.handler(opts);
            }
        }
    },
    load : function(opts) {
        if (opts.title) {
            opts.spinner = Anthill.html.spinner({
                region: opts.region,
                msg: opts.title
            });
            opts.spinner.show();
        }
        opts.hash         = this.hash(opts);
        opts.once         = opts.once    || false;
        opts.hash.headers = opts.headers || {};
        opts.hash.params  = opts.params  || {};
        opts.hash.url     = opts.url;
        if (opts.once) {
            if (this.run) {
                opts.ajax = Ext.Ajax.request(opts.hash);
            }
            this.run  = false;
        } else {
            this.run  = true;
            opts.ajax = Ext.Ajax.request(opts.hash);
        }
    },
    sendFormData : function() {
        var data = this.formHTML.getForm(),
            opts = {
                method:   'put',
                callback: Anthill.form.formCallback
            };
        opts.spinner = Anthill.html.spinner({msg:this.formHTML.title});
        opts.spinner.show();
        opts.hash = Anthill.ajax.hash(opts);
        opts.hash.clientValidation = false;
        data.submit(opts.hash);
    },
    decodeJSON : function(response) {
        return Ext.util.JSON.decode(response.responseText);
    },
    handler : function(opts) {
        if (Anthill.base.unDefined(opts.timestamp)) {Anthill.login.setTimeStamp();}
        if (opts.spinner) {opts.spinner.hide();}
        switch(opts.status) {
            case 200:
                this.success(opts);
                break;
            default:
                this.failure(opts);
                break;
        }
    },
    success : function(opts) {
        try {opts.callback(opts);}
        catch(e) {this.jsError(e);}
    },
    failure : function(opts) {
        opts.json.status = opts.json.status || Anthill.base.defaultErrorCode;
        opts.status = opts.json.status.toString();
        opts.statusText = opts.json.statusText;
        opts.body = Anthill.base.removeHTML(opts.json.responseText, 'body');
        Anthill.html.errorLess({
            clock: Anthill.base.logDate(),
            name:  'Error on: '+opts.title,
            msg:   opts.status+' '+opts.json.statusText+':'+Anthill.html.br+this.errorStatus(opts.status).desc,
            opts:  opts
        });
    },
    jsError : function(e) {
        if (e !== Anthill.ajax.errorCollector) {
            Anthill.ajax.errorCollector = e;
            var errorType = this.errorStatus(Anthill.base.defaultErrorCode),
                opts = {},
                br = Anthill.html.br;
            opts.title = 'Javascript: '+e.name;
            opts.status = errorType.msg;
            opts.statusText = errorType.desc;
            opts.body = [
                opts.title,
                opts.status+': '+opts.statusText+br,
                'Stack: '+Anthill.html.pre(e.stack)
            ].join(br);
            Anthill.html.errorLess({
                clock: Anthill.base.logDate(),
                name:  opts.title,
                msg:   'Line '+e.lineNumber+', file name:'+br+e.fileName+br.loop(2)+e.message,
                opts:  opts
            });
        }
    },
    errorStatus : function(code) {
        return Anthill.base.t('error.status.'+code) || {};
    },
    saveError : function(type, json) {
        var opts = json.opts || {};
        Anthill.ajax.load({
            params: {
                type:   type,
                status: opts.status     || json.status,
                title:  opts.statusText || json.msg,
                body:   opts.body       || json.body
            },
            url:      Anthill.base.getURL('/error_logs/handler/'),
            once:     true,
            callback: Anthill.ajax.errorHandler
        });
    },
    handleJsError : function(message, url, lineNumber) {
        Anthill.ajax.jsError({
            name:       message,
            lineNumber: lineNumber,
            fileName:   url,
            message:    message,
            stack:      'Line '+lineNumber+', file name:'+Anthill.html.br+url+Anthill.html.br.loop(2)+message
        });
        return false;
    },
    errorHandler : function(opts) {
        if (opts.json.error) {
            Ext.Msg.show({
               title:   opts.json.name,
               msg:     opts.json.msg,
               buttons: Ext.Msg.OK,
               icon:    Ext.MessageBox.ERROR
            });
        }
    }
};