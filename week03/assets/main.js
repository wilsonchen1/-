class ITodo {
    constructor(_id, _content, _finished) {
        this.id = _id;
        this.content = _content;
        this.finished = _finished;
    }
}
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function myLocalStorage() {//把数据存储到本地
    let ipt = document.querySelector('input');
    let val = ipt.value;//获取input文本内容

    const item = new ITodo(guid(),'val',false);//创建一个对象，用于记录数据结构的信息
    
    localStorage.setItem('_todos', JSON.stringify(item));
    ipt.value="";//在存储和输出内容后清空输入框内容
}
function removeStorage() {//把对应的条目删掉
    localStorage.removeItem("_todos");
}


let section1=document.getElementById('app');//section1用于显示存储的数据

function item_add(){
    let div1=document.createElement('div');//生成基本元素
    div1.className='todo-item';
    let ipt=document.querySelector('input');
    let val=ipt.value;
    if(val==='') return;//判空操作，输入不能没有

    let i_checkbox=document.createElement('i');
    i_checkbox.classList.add('iconfont','icon-checkbox');
    
    let i_delete=document.createElement('i');
    i_delete.classList.add('iconfont','icon-delete');
    
    let span1=document.createElement('span');
    span1.className='todo-title';
    span1.innerHTML=val;
    
    div1.appendChild(i_checkbox);
    div1.appendChild(span1);
    div1.appendChild(i_delete);

    section1.appendChild(div1);

}
let root=document.getElementById('root');
root.appendChild(section1);