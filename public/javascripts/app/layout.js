Anthill.layout = {
    getId : function(l) {
        return Anthill.layout[l].id;
    },
    northPanel : function(opts) {
        opts = opts || {};
        Anthill.layout.north = new Ext.Panel({
            region: 'north',
            collapsible: false,
            split: false,
            height: 32,
            tbar: Anthill.data.renderButtons({
                json: {setting: {buttons: [
                    {
                        text:     'Logout',
                        tooltip:  'Logout',
                        iconCls:  'icon-logout',
                        disabled: false,
                        multiple: false,
                        id:       'id-button',
                        type:     'split',
                        menu : [
                            {
                                text:    'Remeber me',
                                iconCls: 'icon-logout',
                                handler: Anthill.action.handler.exit
                            },
                            {
                                text:    'Forget about me',
                                iconCls: 'icon-logout',
                                handler: Anthill.action.handler.logout
                            }
                        ]
                    }
                ]}}
            })
        });
        return Anthill.layout.north;
    },
    southPanel : function(opts) {
        opts = opts || {};
        Anthill.layout.south = {
            region: 'south',
            split: true,
            height: 50,
            margins: '0 0 0 0'
        };
        return Anthill.layout.south;
    },
    eastPanel : function(opts) {
        opts = opts || {};
        Anthill.layout.east = {
            region: 'east',
            id: 'east-panel',
            title: 'Help',
            collapsible: true,
            split: true,
            width: 225, 
            minSize: 175,
            maxSize: 400,
            margins: '0 5 0 0',
            layout: 'fit'
        };
        return Anthill.layout.east;
    },
    westPanel : function(opts) {
        opts = opts || {};
        Anthill.layout.west = {
            region: 'west',
            id: 'west-panel',
            title: 'Menu',
            split: true,
            width: 200,
            minSize: 200,
            maxSize: 200,
            enableTabScroll: true,
            collapsible: true,
            margins: '0 0 0 5',
            autoScroll: true,
            layout: {
                type: 'accordion',
                animate: true
            },
            listeners: {
                render: function(){
                    Anthill.ajax.load({
                        url: Anthill.base.getURL('/tools/tool_groups/'),
                        title: Anthill.base.t('loader.tools'),
                        callback: Anthill.layout.renderGroups
                    });
                }
            }
        };
        return Anthill.layout.west;
    },
    centerPanel : function(opts) {
        opts = opts || {};
        Anthill.layout.center = new Ext.TabPanel({
            region: 'center',
            id: 'center-panel',
            deferredRender: false,
            enableTabScroll: true,
            activeTab: 0,
            padding: 5,
            defaults: {autoScroll:true},
            items: [{
                title: 'Home',
                iconCls: 'icon-home'
            }],
            plugins: [new Ext.ux.TabCloseMenu()]
        });
        return Anthill.layout.center;
    },
    destroyLayout : function() {
        if (!Anthill.base.unDefined(Anthill.layout.viewPort)) {
            Anthill.layout.viewPort.destroy();
        }
    },
    viewLayout : function(opts) {
        opts = opts || {};
        Anthill.layout.destroyLayout();
        Anthill.layout.viewPort = new Ext.Viewport({
            layout: 'border',
            items: [
                Anthill.layout.northPanel(opts.north),
                Anthill.layout.southPanel(opts.south),
                Anthill.layout.eastPanel(opts.east),
                Anthill.layout.westPanel(opts.west),
                Anthill.layout.centerPanel(opts.center)
            ]
        });
        return Anthill.layout.viewPort;
    },
    checkTab : function(t, region) {
        var id  = Anthill.layout.getId(region),
            tab = true;
        Ext.each(Ext.getCmp(Anthill.layout.getId(region)).items.items, function(){
            if (this.title === t.innerHTML.stripHTML()) {
                Ext.getCmp(id).setActiveTab(this);
                tab = false;
            }
        });
        return tab;
    },
    renderTools : function(opts) {
        opts.item = Ext.getCmp(opts.id);
        opts.item.removeAll();
        Ext.each(opts.json, function(){
            var item = this;
            opts.item.add({
                title: item.name,
                id: item.controller,
                headerCfg: {cls:'header'},
                listeners: {
                    render: function(){
                        Ext.getCmp(item.controller).header.on('click', function(e, t) {
                            if (Anthill.layout.checkTab(t, 'center')) {
                                Anthill.ajax.load({
                                    url: Anthill.base.getURL('/'+item.controller+'/list/', item.id),
                                    region: Anthill.layout.getId('center'),
                                    title: Anthill.base.t('loader.load')+' '+item.name,
                                    name: item.name,
                                    callback: Anthill.data.renderGrid
                                });
                            } 
                        });
                    }
                }
            });
        })
        opts.item.doLayout();
    },
    renderGroups : function(opts) {
        if (Anthill.form.checkDefaultData(opts)) {
            opts.item = Ext.getCmp(Anthill.layout.getId(Anthill.layout.west.region));
            opts.item.removeAll();
            Ext.each(opts.json.get, function(){
                opts.item.add({
                    title: this.name,
                    id: this.controller+'-'+this.id
                });
                Anthill.layout.renderTools({
                    id: this.controller+'-'+this.id,
                    json: this.nodes
                });
            });
            opts.item.doLayout();
        }
    },
    renderLayout : function(opts) {
        opts.item = Ext.getCmp(opts.id);
        opts.item.add(opts.layout).show();
    }
};