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