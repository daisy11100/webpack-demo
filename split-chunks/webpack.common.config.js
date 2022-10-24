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
            {
                test:/\.js$/,
                use:['babel-loader'],
                include:srcPath,
                exclude:/node_modules/
            },
            // {
            //     test:/\.vue$/,
            //     use:['vue-loader'],
            //     include:srcPath
            // }
        ]
    },
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