# Sample Ext.js application to demonstrate usage of extjs-loader for Webpack

Sample application is taken from https://github.com/yosa/melisa-pens-todomvc and converted it to use [extjs-loader](https://github.com/zmagyar/extjs-loader)

## Usage

Get the source from git then run

`npm install`

from the terminal. Once all the packages are installed you can run `webpack` or `webpack-dev-server`. 
Running `webpack-dev-server` you can test the app at http://localhost:8081/ as normal.

## Description of the operation
### Ext lib requires
Checking `index.html` it can be seen there are no reference to any sencha js or css file. The index.html only refers to the
webpack generated `client-app.entry.js`. This file is built up from `client/todo/app.js` processing all the references 
including all Ext.js requires. 
Some essential Ext.js files need to be required directly to make sure core functions (like `Ext.define` or `Ext.application`)
are defined. See the following block at the top of `app.js`

```javascript
require('../../vendor/sdk/ext/packages/core/src/Boot.js');
require('../../vendor/sdk/ext/packages/core/src/class/Loader.js');
require('../../vendor/sdk/ext/packages/core/overrides/app/Application.js');
```
In your Ext.js code now you must make sure that all components are required. E.g. take a look at the top of `app/view/Wrapper.js`
where you can find the following block.
```javascript
    requires: [
        'Ext.TitleBar',
        'Ext.Toolbar',
        'Ext.Label',
        'Ext.grid.*',
        'Ext.grid.cell.Check',
        'Ext.grid.column.Check',
        'Ext.grid.plugin.Editable',
        'Ext.field.*',
        'Ext.layout.*'
    ],
```
If you are using any Ext component what is not required then you will see an error like: 
> Uncaught Error: [Ext.createByAlias] Unrecognized alias: layout.vbox
>     at Ext.Inventory.instantiateByAlias (client-app.entry.js:1)
>     at Object.factory 

Adding the appropriate require array to the definition this error should go away.
**NOTE** wildcard requires can be used. E.g. you can use `'Ext.layout.*'`

### CSS requires
CSS files can also be required. For example see the top of `app.js`.
```javascript
require('../../vendor/sdk/resources/theme-neptune-all-debug.css').use();
require('css/app.css').use();
```
By using the appropriate loaders in your `webpack.config.js` you can require scss files as well on the same way.
# Credit

Original sample app is created by [Luis Heredia](https://github.com/yosa)