/**
 * inspirate by http://evancz.github.io/elm-todomvc
 * source code in https://github.com/yosa/melisa-pens-todomvc
 */

require('../../vendor/sdk/resources/theme-neptune-all-debug.css').use();
require('css/app.css').use();

require('../../vendor/sdk/ext/packages/core/src/Boot.js');
require('../../vendor/sdk/ext/packages/core/src/class/Loader.js');
require('../../vendor/sdk/ext/packages/core/overrides/app/Application.js');

Ext.application({
    name: 'TodoMVC',
    
    requires: [
        'TodoMVC.view.Wrapper',
        'TodoMVC.view.WrapperModel',
        'TodoMVC.model.Todo',
        'TodoMVC.controller.Controller'
    ],
    
    defaultToken: '/',
    mainView: 'TodoMVC.view.Wrapper'
    
});
