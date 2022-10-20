const path=require('path');
const {srcPath,distPath} = require('./path');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
    entry: {
        index:path.join(srcPath,'index.js'),
        main:path.join(srcPath,'main.js')
    },
    module:{
        rules:[
            // {
            //     test:/\.js$/,
            //     //开启缓存
            //     use:['babel-loader?cacheDirectory'],
            //     include:srcPath,
            //     exclude:/node_modules/
            // },
            // {
            //     test:/\.vue$/,
            //     use:['vue-loader'],
            //     include:srcPath
            // }
        ]
    },
    //文件监听，文件改动后触发编译
    // watch:true,
    // watchOptions:{
    //     ignored:/node_modules/,
    //     aggregateTimeout:300,
    //     poll:1000
    // },
    plugins:[
        //生成html页面
        new HtmlWebpackPlugin({
            template:path.join(srcPath,'index.html'),
            filename:'index.html',
            chunks:['index']  //这个页面要引入哪些js资源。如果不写，会都引入进去
        }),
        new HtmlWebpackPlugin({
            template:path.join(srcPath,'main.html'),
            filename:'main.html',
            chunks:['main']
        })
    ]
}