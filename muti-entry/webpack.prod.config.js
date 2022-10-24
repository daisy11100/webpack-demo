const {merge} = require('webpack-merge');
const baseConf=require('./webpack.common.config');
const {srcPath,distPath}=require('./path');

module.exports=merge(baseConf,{
    mode:'production',
    output:{
        //contentHash,如果打包的源码没有变，则hash不会变，再次请求时就会命中缓存（性能优化）
        //[name]根据入口的属性生成相应的输出文件名
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
            }
       ] 
    }
})