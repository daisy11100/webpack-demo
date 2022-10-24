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