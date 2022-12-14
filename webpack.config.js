const path =require('path');
module.exports={
    //entry:['./src/index.js','./src/test.js']
    entry:{
        index:'./src/index.js',
        test:'./src/test.js'
    },
    output:{
        //输出目录，所有资源打包后的公共目录，包括css和图片
        path:path.resolve(__dirname,'dist'),
        //输出文件名称
        filename:'[name].js',
        //打包前清空输出目录
        clean:true,
        //资源引入的公共路径前缀，
        publicPath:'',
        //非入口文件的chunk名称，即使用import动态导入或splitChunk分的chunk
        // chunkFilename:[contenthash].chunk.js,
    },
    module:{
        rules:[
           {
            test:/\.css$/,
            use:[
                'style-loader',
                'css-loader'
            ]
           } 
        ]
    }
}