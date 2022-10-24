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
        filename:'bundle.[contenthash:8].js',
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
        // 压缩
        minimizer:[new TerserJsPlugin({}),new OptimizeCssAssetsPlugin({})]
    }
})