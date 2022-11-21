class ITodo {//数据结构
    constructor(_id, _content, _finished) {
        this.id = _id;
        this.content = _content;
        this.finished = _finished;
    }
}

function guid() {//返回一个随机id
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function item_add(val) {//把动态节点生成,val传入span内容
    let div1 = document.createElement('div');//生成基本元素
    div1.className = 'todo-item';

    let i_checkbox = document.createElement('i');
    i_checkbox.classList.add('iconfont', 'icon-checkbox');


    let i_delete = document.createElement('i');
    i_delete.classList.add('iconfont', 'icon-delete');

    let span1 = document.createElement('span');
    span1.className = 'todo-title';
    span1.innerHTML = val;

    div1.appendChild(i_checkbox);
    div1.appendChild(span1);
    div1.appendChild(i_delete);

    section1.appendChild(div1);
}

function myLocalStorage() {//把数据存储到本地,并且维护这个数组
    localStorage.setItem('_todos', JSON.stringify(todos));
}

function myArrayStorage() {//把数据存储到数组,是主函数

    let ipt = document.querySelector('input');
    let val = ipt.value;//获取input文本内容
    if (val === '') return;//判空操作，输入不能没有
    const item = new ITodo(guid(), val, false);//创建一个对象，用于记录数据结构的信息
    todos.push(item);//将该对象放入数组
    item_add(val);
    ipt.value = "";//在存储和输出内容后清空输入框内容
    myLocalStorage();
}
function checked(e) {//修改finished
    let todo = new ITodo;
    for (todo of todos) {
        if (todo.id === e.target.parentNode.id) {//找到匹配的那一条
            if (todo.finished === true) { todo.finished = false; e.target.parentNode.classList.remove('todo-finished'); }
            else { todo.finished = true; e.target.parentNode.classList.add('todo-finished'); }
        }
    }
    myLocalStorage();//把修改完的数组存储到本地
}

function myDelete(e) {//把对应的条目删掉
    let todo =new ITodo;
    let flag=0;//记录要删除的数组元素
    for(todo of todos){
        if(todo.id === e.target.parentNode.id){
            todos.splice(flag,1);
            section1.removeChild(e.target.parentNode);
        }
        flag++;
    }
    myLocalStorage();//把修改完的数组存储到本地
}

function init() {
    todos = JSON.parse(localStorage.getItem('_todos'));
    if (todos === null) todos = [];//如果本身刚打开页面，没必要初始化
    let todo = new ITodo();
    for (todo of todos) {
        let div1 = document.createElement('div');//生成基本元素
        div1.className = 'todo-item';
        div1.id = todo.id;

        let i_checkbox = document.createElement('i');
        i_checkbox.classList.add('iconfont', 'icon-checkbox');
        i_checkbox.addEventListener('click', checked);//监听已做事件
        if (todo.finished === true) {//如果事件已完成那么初始化时也应该是已完成状态
            div1.classList.add('todo-finished');
        }

        let i_delete = document.createElement('i');
        i_delete.classList.add('iconfont', 'icon-delete');
        i_delete.addEventListener('click',myDelete);

        let span1 = document.createElement('span');
        span1.className = 'todo-title';
        span1.innerHTML = todo.content;

        div1.appendChild(i_checkbox);
        div1.appendChild(span1);
        div1.appendChild(i_delete);

        section1.appendChild(div1);
    }

}
let root = document.getElementById('root');
let section1 = document.getElementById('app');//section1用于显示存储的数据
let todos = [];
init();//如果之前local存储了数据，那么初始化
root.appendChild(section1);//把之前动态添加的节点显示出来