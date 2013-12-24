Anthill.base = {
    defaultErrorCode : 405,
    defaultLanguageCode : 'us',    
    currentLanguageCode : 'us',
    subfolder : ['/admin'],
    log : function() {
        if (!this.unDefined(window.console)) {
            console.log(arguments);
        }
    },
    t : function(hash, lang) {
        var language = lang ||
            this.currentLanguageCode ||
            this.defaultLanguageCode;
        return this.key2hash(hash, Anthill.globalizer[language]);
    },
    key2hash : function(key, obj) {
        if (this.unDefined(key) || typeof key !== 'string') {
            return (typeof key).toUpperCase();
        }
        var hash = key.split(/\./);
        Ext.each(hash, function(k, v){
            obj = obj[k];
        });
        return obj || key;
    },
    runCallback : function(opts) {
        if (opts.fn instanceof Function) {
            opts.fn(opts.params);
        }
    },
    timeStamp : function() {
        return new Date().getTime();
    },
    logDate : function() {
        return new Date().format('g:i:s A');
    },
    setAppMode : function(mode) {
        Anthill.base.appMode=mode||'development';
    },
    setLangaugeCode : function(name) {
        return (this.unDefined(name)) ?
            (window.location.pathname.split(/\//)[3] ||
            this.defaultLanguageCode) :
            this.currentLanguageCode = name;
    },
    getURL : function(action, id) {
        return this.subfolder[0]+
           action+
           this.currentLanguageCode+
           (this.unDefined(id) ? '' : '/'+id);
    },
    renderURL : function(opts) {
        var url = opts.json.setting,
            loc = window.location;
        return loc.protocol+'//'+loc.host+this.subfolder.concat([
           url.type,
           url.action,
           this.currentLanguageCode,
           url.id
        ]).join('/');
    },
    removeHTML : function(html, tag) {
        var text = '';
        try {
            text = html.split('<'+tag.toLowerCase()+'>')[1].
                        split('</'+tag.toLowerCase()+'>')[0];
        } catch(e) {
            this.log(html, tag);
            Anthill.ajax.jsError(e);
        }
        return text;
 	},
    isBlank : function(str) {
        return Ext.util.Format.trim(str).length === 0;
    },
    define : function(instance, value) {
        if (this.defined(instance)) {
            return instance;
        }
        return value;
    },
    defined : function(e) {
        return !this.unDefined(e);
    },
    unDefined : function(e) {
        return typeof e==='undefined';
    },
    isNull : function(e) {
        return e===null;
    },
    isDefined : function(params) {
        return this.unDefined(Ext.each(params, function(p){
            if (Anthill.base.unDefined(p) || Anthill.base.isNull(p)) {
                return false;
            } else {
                return !Anthill.base.isBlank(p);
            }
        }));
    },
    updateClock : function(id) {
        Ext.getCmp(id).setText(new Date().format('g:i:s A'));
    },
    setDefault : function(opts) {
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
        Ext.QuickTips.init();        
    },
    LZW : {
        encode : function(s){
            var dict = {};
            var data = (s + "").split("");
            var out = [];
            var currChar;
            var phrase = data[0];
            var code = 256;
            for (var i=1; i<data.length; i++) {
                currChar=data[i];
                if (dict[phrase + currChar] != null) {
                    phrase += currChar;
                } else {
                    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                    dict[phrase + currChar] = code;
                    code++;
                    phrase=currChar;
                }
            }
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            for (var i=0; i<out.length; i++) {
                out[i] = String.fromCharCode(out[i]);
            }
            return out.join("");
        },
        decode : function(s){
            var dict = {};
            var data = (s + "").split("");
            var currChar = data[0];
            var oldPhrase = currChar;
            var out = [currChar];
            var code = 256;
            var phrase;
            for (var i=1; i<data.length; i++) {
                var currCode = data[i].charCodeAt(0);
                if (currCode < 256) {
                    phrase = data[i];
                } else {
                   phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
                }
                out.push(phrase);
                currChar = phrase.charAt(0);
                dict[code] = oldPhrase + currChar;
                code++;
                oldPhrase = phrase;
            }
            return out.join("");
        }
    }
};