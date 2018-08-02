const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath:'/dist/',
        filename: 'js/app.js'
    },
    resolve:{
      alias : {
        page: path.resolve(__dirname, 'src/page'),
        component: path.resolve(__dirname, 'src/component'),
        util: path.resolve(__dirname, 'src/util'),
        images:path.resolve(__dirname,'images'),
        service:path.resolve(__dirname, 'src/service')
      }
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }],"transform-decorators-legacy"]
                    }
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './favicon03.ico'
        }),
        new ExtractTextPlugin("css/[name].css"),

        //提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
          name: 'common',
          filename: 'js/base.js'
        })
    ],
    devServer: {
      port: 8086,
      host:"192.168.129.69",
      historyApiFallback: {
        index: '/dist/index.html'
      },
      proxy: {
        '/manage' : {
          target: 'http://admintest.happymmall.com',
          changeOrigin: true
        },
        '/api' : {
          target: 'http://api.100moo.com',
          // target:'http://192.168.129.79',
          changeOrigin: true
        },
        '/project-planing/map' : {
          target: 'http://192.168.1.3/',
          changeOrigin: true
        }

      }
    }
}
