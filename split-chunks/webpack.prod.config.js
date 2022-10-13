const {merge} = require('webpack-merge');
const baseConf=require('./webpack.common.config');
const {srcPath,distPath}=require('./path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const webpack =require('webpack');
const TerserJsPlugin=require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin')

module.exports=merge(baseConf,{
    mode:'production',
    output:{
        //contentHash,如果打包的源码没有变，则hash不会变，再次请求时就会命中缓存（性能优化）
        filename:'[name].[contenthash:8].js',
        path:distPath,
        clean:true,
    },
    module:{
       rules:[
            {
                test:/\.(png|jpg|gif)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        //小于5kb的图片使用base64产出，减少http请求，提高页面性能
                        limit: 5*1024,
                        outputPath:'/img1/',
                    }
                }
            },
            //抽离css
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }
       ] 
    },
    plugins:[
        new webpack.DefinePlugin({
            ENV:JSON.stringify('production')
        }),
        //抽离css
        new MiniCssExtractPlugin({
            filename:'css/main.[contenthash:8].css'
        })
    ],
    optimization:{
        // 压缩css
        minimizer:[new TerserJsPlugin({}),new OptimizeCssAssetsPlugin({})],
        //代码分割
        splitChunks:{
            chunks:'all',
            // initial:入口chunk,对异步引入的js不做处理
            // async:异步chunk,只对异步引入的js处理
            // all：都处理

            //缓存分组
            cacheGroups:{

                vendor:{
                    name:'vendor',
                    priority:1,  //权重 抽离优先级
                    test:/node_modules/,
                    minSize:0,  //大小限制  有些过于小的第三方模块没必要单独打包
                    minChunks:1,  //最少复用几次  打包匹配规则，当复用次数达到这个数量，就单独打包
                },
                common:{
                    name:'common',
                    priority:0, 
                    minSize:0,
                    minChunks:2,
                }
            }
        }
    }
})