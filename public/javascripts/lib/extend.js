Anthill.extend = {
    init: function() {
        with(this){
            ordinalize(String);
            ordinalize(Number);
            XOR();
            trim();
            loop();
            stripHTML();
            capitalize();
            pluralize();
            singularize();
            merge();
        }
    },
    merge: function() {
        Object.extend = function(destination, source) {
            for (var property in source)
                destination[property] = source[property];
            return destination;
        };
    },
    ordinalize: function(o){
        o.prototype.ordinalize = function() {
            return Inflector.ordinalize(this+'');
        };
    },
    XOR: function() {
        Boolean.prototype.XOR = function(bool2){
           var bool1=this.valueOf();
           return (bool1==true && bool2==false) || (bool2==true && bool1==false);
        };
    },
    trim: function() {
        String.prototype.trim = function(){
            return this.replace(/^\s+|\s+$/g,'');
        };
    },
    loop: function() {
        String.prototype.loop = function(c){
            var str='';c=c||1;
            for(var i=1;i<=c;i++){str+=this;}
            return str;
        };
    },
    stripHTML: function() {
        String.prototype.stripHTML = function(){
            return this.replace(/<(?:.|\s)*?>/g,'');
        };
    },
    capitalize: function() {
        String.prototype.capitalize = function(){
            return this.replace(/\w+/g, function(a){
                return a.charAt(0).toUpperCase()+a.substr(1).toLowerCase();
            });
        };
    },
    pluralize: function() {
        String.prototype.pluralize = function(count, plural) {
            if (typeof count === 'undefined') {
                return Inflector.pluralize(this);
            } else {
                return count + ' ' + (1 == parseInt(count) ? this : plural || Inflector.pluralize(this));
            }
        }
    },
    singularize: function() {
        String.prototype.singularize = function(count) {
            if (typeof count === 'undefined') {
                return Inflector.singularize(this);
            } else {
                return count + " " + Inflector.singularize(this);
            }
        }
    }
};