Ext.define('TodoMVC.model.Todo', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.LocalStorage'
    ],

    fields: [
        'id', 'text', 'active', 'completed', 'delete'
    ],
    
    proxy: {
        type: 'localstorage',
        id: 'todos-extjs'
    }
    
});
