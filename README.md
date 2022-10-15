<!--
 * @Author: duanxinxin
 * @Date: 2022-10-12 22:56:13
 * @LastEditors: duanxinxin
 * @LastEditTime: 2022-10-12 22:59:55
 * @Description: 
-->
webpack配置   
## 基础配置
### 1、拆分模块  
一般开发分为common.js、dev.js和prod.js  
common.js中放公共配置
dev中开发环境下的配置，devSever等  
prod中放生产环境下的配置 图片压缩 路径变化等

### 2、merge
安装webpack-merge包   
在prod和dev中引入common

### 3、处理ES6
在module中，匹配js文件，使用babel-loader

### 4、处理css
匹配到css文件，然后使用css-loader和style-loader，有时需要postcss-loader

css-loader：将样式生成css文件  
style-loader：是将生成的css文件插入到页面中  
postcss-loader： 做浏览器兼容css用的，需要添加一个postcss.config.js文件，其中熟知的autoprefixer就是为样式添加前缀   

### 5、关于图片


## 高级配置

### 1、多入口
1）修改entry为多入口   
2）修改output的输出文件名[name]（根据入口的属性 输出相应的出口文件名）  
3）几个入口文件写相应数量的HtmlWebpackPlugin，chunks中需要配置引入的资源，不写就打包的js会全部引入进去  

### 2、css文件抽离压缩
#### 抽离  
dev环境中不需要进行css抽离，继续使用原来的css-loader和style-loader，将产出的css代码插入到页面中  
prod环境中需要对css文件进行抽离，用到mini-css-extract-plugin这个loader，替换style-loader。即可达到效果

#### 压缩
使用terser-webpack-plugin和optimize-css-assets-webpack-plugin对其进行压缩  
在webpack的optimization配置选项中


### 3、抽离公共代码和第三方代码
#### 公共代码
A模块中引入了test.js   
B模块中也引入了test.js   
test.js就会被打包两次 


#### 第三方代码
比如引入一个swiper.js,我们是希望第三方代码单独打包的   
因为每次修改一点点业务代码的时候，就会导致重新打包（包含第三方代码），打包很慢   
但其实第三方代码并没有修改，所以没必要重新打包，因此把第三方代码和业务代码拆开打包    
第三方代码重新打包的时候就会命中缓存，从而提高打包速度   

#### 代码分割
主要是在prod环境中，optimization配置下添加部分配置   
这部分是生成chunks的一些配置
```
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
```

使用chunks的配置在common的htmlwebpackplugin中  

### 3、懒加载

在setTimeOut中import需要的js资源即可，返回的是一个promise（是原生支持的语法 ）  
并且这个异步引入的资源，会单独打包成一个chunk。





