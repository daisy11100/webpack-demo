const path=require('path');
const {srcPath,distPath} = require('./path');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
    entry: path.join(srcPath,'index'),
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
        new HtmlWebpackPlugin({
            template:path.join(srcPath,'index.html'),
            filename:'index.html'
        })
    ]
}