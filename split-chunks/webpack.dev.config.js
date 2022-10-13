const {merge} = require('webpack-merge');
const baseConf=require('./webpack.common.config');
const {srcPath,distPath}=require('./path');
const webpack = require('webpack');


module.exports=merge(baseConf,{
    mode:'development',
    module:{
        rules:[
            {
                test:/\.(png|jpg|gif)$/,
                use:'file-loader'
            },
            {
                test:/\.css$/,
                //css-loader:解析出一个css文件
                //style-loader:将css文件插入到页面中
                //postcss-loader:做浏览器兼容，autoprefixer为样式加前缀
                use:['style-loader','css-loader','postcss-loader']
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            ENV:JSON.stringify('development')
        })
    ],
    devServer:{
        port:8080
    }
})