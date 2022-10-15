class Test{
    constructor(){
        document.write('hello,world')
    }
}
new Test();

function insertImageElem(imgFile){
    const img=new Image();
    img.src=imgFile;
    document.body.appendChild(img);
}

import imgFile from './img/1111.png'
insertImageElem(imgFile);
import index from './style/index.css'
import Test1 from './test';
Test1('index');
//引入动态数据
setTimeout(()=>{
    // 类似定义一个chunk
    import('./dynamic.js').then(res=>{
        console.log(res.default.message);
    })
},1000)
