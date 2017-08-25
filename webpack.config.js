/**
 * Created by zoltanmagyar on 2017. 03. 31..
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('webpack-uglify-js-plugin');

module.exports = {

    watch : true,

    resolve: {
        modules: [process.cwd(), 'local/', 'client/todo/', 'client/', 'node_modules'],
    },
    entry: {
        'app': ['webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8081/',
            './client/todo/app.js'],
    },
    output: {
        path: path.resolve(process.cwd(), 'build/'),
        filename: 'client-[name].entry.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'extjs-loader',
                        options: {
                            sourceMap: false,
                            debug: false,
                            nameSpace: 'Calc',
                            paths: {
                                // 'Ext.ux': 'utils/ux/',
                                Ext: {
                                    use: 'extjs-parser',
                                    options: {
                                        path: 'vendor/sdk/ext',
                                        toolkit: 'modern',
                                        namespace: 'Ext',
                                        aliasForNs: ['Deft'],
                                        packages: ['core', 'deft', 'google', 'charts'],
                                    },
                                },
                                TodoMVC: 'app/',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                exclude: /node_modules/,
                loader: 'url-loader',
                options: {
                    limit: 10000000,
                    name: './resources/css/dist/[name].[hash].[ext]',
                },
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader/useable',
                    }, {
                        loader: 'css-loader',
                        options: {
                            debug: true,
                            sourceMap: true,
                        },
                    }, {
                        loader: 'postcss-loader',
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    }],
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader/useable',
                    }, {
                        loader: 'css-loader',
                        options: {
                            debug: true,
                            sourceMap: true,
                        },
                    }],
            },
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //
        // new webpack.NamedModulesPlugin(),
        //
        /*new WriteFilePlugin({
            log: false,
        }),*/

        new UglifyJsPlugin({
            cacheFolder: path.resolve(__dirname, 'public/cached_uglify/'),
            parallel: {
                cache: true,
                workers: 4
            },
            debug: false,
            minimize: true,
            sourceMap: true,
            output: {
                comments: false,
            },
            compressor: {
                warnings: false,
            },
        }),

        new CopyWebpackPlugin([
            {context: 'client/todo', from: '*.html'},
        ], {
            copyUnmodified: false,
        }),

    ],
};
