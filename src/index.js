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
