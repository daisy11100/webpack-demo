const {merge} = require('webpack-merge');
const baseConf=require('./webpack.common.config');
const {srcPath,distPath}=require('./path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const webpack =require('webpack');
const TerserJsPlugin=require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin')
const HappyPack=require('happypack');
const ParallelUglifyPlugin=require('webpack-parallel-uglify-plugin');
const ModuleConcatenationPlugin=require('webpack/lib/optimize/ModuleConcatenationPlugin')

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
                test:/\.js$/,
                //开启缓存
                use:['happypack/loader?id=babel'],
                include:srcPath,
                exclude:/node_modules/
            },
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
    resolve:{
        //优先采用jsnext：main中指向的ES6模块法语法的文件
        mainFields:['jsnext:main']
    },
    plugins:[
        new webpack.DefinePlugin({
            ENV:JSON.stringify('production')
        }),
        //抽离css
        new MiniCssExtractPlugin({
            filename:'css/main.[contenthash:8].css'
        }),
        //开启多进程打包
        new HappyPack({
            //用id来标识当前happypack是用来处理哪一类文件的
            id:'babel',
            loaders:['babel-loader?cacheDirectory']
        }),
        //压缩js    
        // new UglifyJSPlugin({
        //     compress:{
        //         warning:false,  //删除无用代码时不警告
        //         drop_console:true,   //删除console
        //         collapse_vars:true,  //内嵌定义了但只使用了一次的变量
        //         reduce_vars:true    //提取使用多次但未定义成变量的静态值
        //     },
        //     output:{
        //         beautify:false,  //紧凑输出
        //         comments:false, //删除评论
        //     }
        // }),
        new ParallelUglifyPlugin({
            //还是使用了uglifyJS去压缩代码，只不过开启了多进程
            uglifyJS:{
                output:{
                    beautify:false,  //紧凑输出
                    comments:false, //删除注释
                },
                compress:{
                    drop_console:true,  //删除console
                    collapse_vars:true,  //内嵌定义了但只使用了一次的变量
                    reduce_vars:true   //提取多次出现但没定义成变量的静态值
                }
            }
        }),
        //开启scope hoisting
        new ModuleConcatenationPlugin(),
        //忽略local目录的打包
        new webpack.IgnorePlugin({
            resourceRegExp: /\.\/locale/,
            contextRegExp: /moment/,
        })
    ],
    optimization:{
        // 压缩css
        minimizer:[
            new TerserJsPlugin({
                // parallel:true,
                terserOptions:{
                    toplevel:true,
                    ie8:true,
                    safari10:true
                }
            }),
            new OptimizeCssAssetsPlugin({})
        ],
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