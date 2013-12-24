Ext.onReady(function(){
    Ext.getDom(window).onerror = Anthill.ajax.handleJsError;
    Anthill.extend.init();
    Anthill.base.setDefault();
    Anthill.ajax.load({
        url: Anthill.base.getURL('/languages/check/'),
        title: Anthill.base.t('loader.language'),
        callback: Anthill.login.loginAction
    });
});