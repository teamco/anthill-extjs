Anthill.data = {
    storeMap : {},
    gridMap  : {},
    gridTools: {},
    checkParams : function(opts) {
        var def = ['remove', 'create']
        if (!Anthill.base.unDefined(opts)) {
            switch(true) {
                case Anthill.base.isDefined([opts.fields, opts.query]):
                    opts.remove = ['dir', 'sort'];
                    opts.create = 'search';
                    break;
                case Anthill.base.isDefined([opts.dir, opts.sort]):
                    opts.remove = ['fields', 'query'];
                    opts.create = 'sort';
                    break;
            }
            opts.remove = Anthill.base.unDefined(opts.remove) ? def : opts.remove.concat(def);
        }
        return opts;
    },
    save : function(opts) {
        Anthill.base.log(opts);
    },
    print : function(opts) {
        Anthill.base.log(opts);
    },
    help : function(opts) {
        Anthill.base.log(opts);
    },
    refresh : function(opts) {
        Anthill.base.log(opts);
    },
    reader : function(opts) {
        return opts.json.reader;
    },
    expander : function(opts) {
        return new Ext.ux.grid.RowExpander({
            tpl: new Ext.Template(opts.tpl)
        });
    },
    renderCheckboxes : function(opts) {
        var buttons = Anthill.data.getButtons(opts),
            buttonCmp;
        return new Ext.grid.CheckboxSelectionModel({
            listeners: {
                selectionchange: function(sm) {
                    Ext.each(buttons, function(){
                        buttonCmp = Ext.getCmp(this.id);
                        buttonCmp.selected = [];
                        if (sm.getCount()>=1) {                            
                            if (sm.getCount()>1 && !this.multiple) {
                                buttonCmp.disable();
                            } else {
                                buttonCmp.selected = sm.selections.items;
                                buttonCmp.enable();
                            }
                        } else {
                            if (this.disabled) {
                                buttonCmp.disable();
                            } else {
                                buttonCmp.enable();
                            }
                        }
                    });
                }
            }
        });
    },
    setButtonSeparator : function(buttons) {
        var separator = [];
        Ext.each(buttons, function(){
            separator.push(this);
            separator.push('-');
        });
        return separator;
    },
    setMenuList : function(list) {
        var menu = [];
        Ext.each(list, function(){
            var hash = {};
            Ext.iterate(this, function(k, v){
                hash[k] = v;
            });
            menu.push(hash);
        });
        return menu;
    },
    getButtons : function(opts) {
        var buttons = [];
        Ext.each(opts.json.setting.buttons, function(){
            switch(this.type) {
                case 'button':
                    buttons.push({
//                        xtype:    'tbbutton',
                        text:     this.text,
                        tooltip:  this.tooltip,
                        iconCls:  this.iconCls,
                        disabled: this.disabled,
                        multiple: this.multiple,
                        handler:  Anthill.action.handler[this.handler],
                        id:       this.id
                    });
                    break;
                case 'split':
                    buttons.push(
                        new Ext.Toolbar.SplitButton({
//                            xtype:   'tbsplit',
                            text:    this.text,
                            tooltip: this.tooltip,
                            iconCls: this.iconCls,
                            handler: this.handler,
                            menu :   {
                                items: Anthill.data.setMenuList(this.menu)
                            }
                        })
                    );
                    break;
            }
        });
        return buttons;
    },
    renderButtons : function(opts) {
        return new Ext.Toolbar({
            items: Anthill.data.setButtonSeparator(Anthill.data.getButtons(opts))
        });
    },
    columns : function(opts) {
        opts = opts || {};        
        opts.defaultColumns = [
            Anthill.data.renderCheckboxes(opts),
            new Ext.grid.RowNumberer({
                header:'N'
            })
        ];
        if (opts.json.setting.expander) {
            opts.defaultColumns = [Anthill.data.expander(opts.json.setting)].concat(opts.defaultColumns);
        }
        Ext.each(opts.json.columns, function(){
            if (!Anthill.base.isNull(this.renderer)) {
                this.renderer = Anthill.action.handler[this.renderer];
            }
            opts.defaultColumns.push(this);
        });
        return opts.defaultColumns;
    },
    renderProgressBar : function(opts) {
        return new Ext.PagingToolbar({
            pageSize: opts.json.setting.pager,
            store: Anthill.data.storeMap[opts.json.setting.type],
            displayInfo: opts.json.setting.displayInfo || true,
            plugins: new Ext.ux.ProgressBarPager()
        });
    },
    store : function(opts) {
        var setting = opts.json.setting,
        store   = {},
        method  = 'Json',
        readers = {
            fields:        Anthill.data.reader(opts),
            totalProperty: 'total',
            root:          'data'
        },
        defaults = {
            remoteSort:  setting.sort.remote,
            url:         Anthill.base.renderURL(opts),
            data:        opts.json,
            autoDestroy: setting.autoDestroy || true,
            baseParams: {
                method: opts.method || 'POST',
                create: setting.action
            }
        };
        if (!Anthill.base.isNull(setting.group_by)) {
            method = 'Grouping';
            store  = {
                groupField:  setting.group_by,
                reader:      new Ext.data.JsonReader(readers),
                groupOnSort: setting.groupOnSort || false,
                remoteGroup: setting.groupRemote || true,
                autoLoad:    setting.autoLoad    || true
            };
        }
        Object.extend(Object.extend(store, readers), defaults);
        store.listeners = {};
        return new Ext.data[method+'Store'](store);
    //            listeners : {
    //                beforeload : function(hash, vars) {
    //                    opts.hash    = data.checkParams(vars.params);
    //                    base.log(opts.hash);
    //                    var msg      = opts.hash.create ? opts.hash.create.capitalize() : ' Search';
    //                    opts.spinner = html.spinner({
    //                        region: data.gridMap[setting.type].id,
    //                        msg: globalizer.translate({item:'loader'})+msg
    //                    });
    //                    opts.spinner.show();
    //                },
    //                datachanged : function(store) {
    //                    opts.hash = data.checkParams(opts.hash);
    //                    opts.spinner.hide();
    //                    data.clearParams(opts);
    //                },
    //                exception: function(data, type, action, options, response) {
    //                    ajax.failure({
    //                        json: response,
    //                        status: response.status
    //                    });
    //                }
    //            }

    },
    clearSort : function(opts) {
        var type = opts.json.setting.type,
            grid = Anthill.data.gridMap[type], view;
        if (grid) {
            view = grid.getView();
            view.updateHeaders();
            view.el.select(view.cellSelector).removeClass(view.sortClasses);
        }
        if (!Anthill.base.unDefined(Anthill.data[type])) {
            Anthill.data[type].lastOptions = {};
            Anthill.data[type].sortInfo    = {};
            Anthill.data[type].sortToggle  = {};
        }
    },
    clearSearch : function(opts) {
        opts.searcher.onTriggerClear();
    },
    clearParams : function(opts) {
        if (opts.hash) {
            switch(opts.hash.create) {
                case 'sort':
                    break;
                case 'search':
                    //this.clearSort(opts);
                    break;
            }
            Ext.each(opts.hash.remove, function(p){
                delete opts.hash[p];
            });
        }
    },
    refreshGrid : function(opts) {

    },
    renderTools : function(opts) {
        var vars    = {},
        setting = opts.json.setting;
        opts.tools  = [];
        Anthill.data.gridTools[setting.type] = {};
        Ext.each(setting.tools, function(t){
            Anthill.data.gridTools[setting.type][t.id] = {
                id: t.id,
                qtip: t.id.capitalize()+' '+opts.name,
                hidden: t.hidden || false,
                handler: function(event, toolEl, panel){
                    vars.create = t.cls || t.id;
                    vars.reset  = t.reset || false;
                    Anthill.data.clearParams(opts);
                    Anthill.data.storeMap[setting.type].load({
                        params: vars,
                        callback: function(r, options){
                            if (t.highlight) {
                                Ext.select('.x-grid3-body  table').highlight();
                            }
                            opts.spinner.hide();
                            Anthill.data.clearSort(opts);
                            //                            data.clearParams(opts);
                            Anthill.data[t.id](r);
                        }
                    });
                }
            };
            opts.tools.push(Anthill.data.gridTools[setting.type][t.id]);
        });
        return opts.tools;
    },
    search : function(opts) {
        var search    = opts.json.setting.search;
        opts.searcher = new Ext.ux.grid.Search({
            iconCls:        'icon-zoom',
            readonlyIndexes:['item_id', 'updated_at'],
            disableIndexes: [undefined],
            minChars:       search.min,
            mode:           search.mode,
            autoFocus:      search.focus    || true,
            position:       search.position || 'top',
            align:          search.align    || 'right',
            width:          search.width    || 150
        });
        return opts.searcher;
    },
    plugins : function(opts) {
        var plugins = [
            new Ext.ux.PanelResizer({
                minHeight: opts.minHeight || 300
            }),
            Anthill.data.search(opts)
        ];
        if (opts.json.setting.expander) {
            plugins.push(Anthill.data.expander(opts.json.setting));
        }
        return plugins;
    },
    columnModel : function(opts) {
        return new Ext.grid.ColumnModel({
            defaults: {
                sortable: opts.json.setting.sort.able
            },
            columns: Anthill.data.columns(opts)
        });
    },
    viewConfig : function(opts) {
        var setting = opts.json.setting;
        return {
            forceFit:      setting.forceFit      || true,
            enableRowBody: setting.enableRowBody || true,
            showPreview:   setting.showPreview   || true
        }
    },
    groupingView : function(opts) {
        var setting = opts.json.setting;
        return Anthill.base.isNull(setting.group_by) ? false :
        new Ext.grid.GroupingView({
            forceFit:       true,
            enableNoGroups: setting.enableNoGroups || true,
            enableRowBody:  setting.enableRowBody  || true,
            groupTextTpl:   '{text} ({[values.rs.length]} {[values.rs.length>1 ? "'+
                Anthill.form.label('items')+'":"'+
                Anthill.form.label('item')+'"]})'
        });
    },
    configGrid : function(opts) {
        var setting = opts.json.setting;
        Anthill.data.storeMap[setting.type] = Anthill.data.store(opts);
        Anthill.data.gridMap[setting.type]  = new Ext.grid.GridPanel({
            closable:           opts.closable         || true,
            collapsible:        opts.collapsible      || false,
            columnLines:        opts.columnLines      || true,
            disableSelection:   opts.disableSelection || false,
            frame:              opts.frame            || true,
            loadMask:           opts.loadMask         || true,
            title:              opts.name,
            autoExpandColumn:   setting.autoexpand,
            iconCls:            'icon-'+setting.type,
            cm:                 Anthill.data.columnModel(opts),
            viewConfig:         Anthill.data.viewConfig(opts),
            store:              Anthill.data.storeMap[setting.type],
            tools:              Anthill.data.renderTools(opts),
            tbar:               Anthill.data.renderButtons(opts),
            sm:                 Anthill.data.renderCheckboxes(opts),
            bbar:               Anthill.data.renderProgressBar(opts),
            plugins:            Anthill.data.plugins(opts),
            view:               Anthill.data.groupingView(opts)
        });
        return Anthill.data.gridMap[setting.type];
    },
    renderGrid : function(opts) {
        if (Anthill.form.checkDefaultData(opts)) {
            var grid = Anthill.data.configGrid(opts);
            Anthill.layout.renderLayout({
                id: opts.region,
                limit: opts.json.setting.pager,
                store: Anthill.data.storeMap[opts.json.setting.type],
                layout: grid
            });
        }
    }
};