import { ITodo, Todo } from './types'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import './styles/main.css';
import './styles/iconfont.css';


function item_add(item: Todo, isInit = false) {//把动态节点生成,val传入span内容
    let div1 = document.createElement('div');//生成基本元素
    div1.className = 'todo-item';

    let i_checkbox = document.createElement('i');
    i_checkbox.classList.add('iconfont', 'icon-checkbox');
    i_checkbox.addEventListener('click', () => checked(item));//监听已做事件
        if (item.finished === true) {//如果事件已完成那么初始化时也应该是已完成状态
            div1.classList.add('todo-finished');
        }

    let i_delete = document.createElement('i');
    i_delete.classList.add('iconfont', 'icon-delete');
    i_delete.addEventListener('click', () => myDelete(item));

    let span1 = document.createElement('span');
    span1.className = 'todo-title';
    span1.innerHTML = item.content;


    let myTime = document.createElement('span');
    myTime.innerHTML = item.mtime;
    myTime.className = 'todo-title';

    div1.appendChild(i_checkbox);
    div1.appendChild(span1);
    div1.appendChild(myTime);
    div1.appendChild(i_delete);

    section1.appendChild(div1);
    item.el=div1;
    todos.push(item);//将该对象放入数组
}

function myLocalStorage() {//把数据存储到本地,并且维护这个数组
    localStorage.setItem('_todos', JSON.stringify(todos));
}

function myArrayStorage() {//把数据存储到数组,是主函数

    let ipt = document.querySelector('input') as HTMLInputElement;
    let val = ipt.value.trim();//获取input文本内容
    if (val === '') return;//判空操作，输入不能没有
    let todo = new Todo({ id: uuidv4(), ctime: dayjs().toString(), mtime: dayjs().toString(), content: val, finished: false })
    item_add(todo, false);
    ipt.value = "";//在存储和输出内容后清空输入框内容
    myLocalStorage();
}
function checked(item: Todo) {//修改finished
    let todo: Todo;
    item.finished = !item.finished
    item.mtime = dayjs().toString();
    let className = 'todo-item'
    if (item.finished === true) className += ' todo-finished'
    item.el.className = className

    myLocalStorage();//把修改完的数组存储到本地
}

function myDelete(item: Todo) {//把对应的条目删掉
    let todo: Todo;
    section1.removeChild(item.el)
    let index = todos.indexOf(item)
    todos.splice(index, 1)
    myLocalStorage();//把修改完的数组存储到本地
}

function init() {
    let _todos: ITodo[] = JSON.parse(localStorage.getItem('_todos'))
    if (_todos) {
        for (let item of _todos) {
            let todo = new Todo(item)
            item_add(todo, true);
        }
    }

    // let todo: ITodo;
    // for (todo of todos) {
    //     let div1 = document.createElement('div');//生成基本元素
    //     div1.className = 'todo-item';
    //     div1.id = todo.id;

    //     let i_checkbox = document.createElement('i');
    //     i_checkbox.classList.add('iconfont', 'icon-checkbox');
    //     // i_checkbox.addEventListener('click', ()=>checked(todo));//监听已做事件
    //     if (todo.finished === true) {//如果事件已完成那么初始化时也应该是已完成状态
    //         div1.classList.add('todo-finished');
    //     }

    //     let i_delete = document.createElement('i');
    //     i_delete.classList.add('iconfont', 'icon-delete');
    //     // i_delete.addEventListener('click', ()=>myDelete(todo));

    //     let span1 = document.createElement('span');
    //     span1.className = 'todo-title';
    //     span1.innerHTML = todo.content;

    //     div1.appendChild(i_checkbox);
    //     div1.appendChild(span1);
    //     div1.appendChild(i_delete);

    //     section1.appendChild(div1);
    // }
}
let root = document.getElementById('root') as HTMLElement;
let section1 = document.getElementById('app') as HTMLElement;//section1用于显示存储的数据
let todos: Todo[] = [];
init();//如果之前local存储了数据，那么初始化
// 监听输入框的回车事件，添加条目
let input = document.getElementById('input') as HTMLInputElement
input.addEventListener('keydown', event => {
    let value = input.value.trim();
    if (event.key === 'Enter' && value !== '') myArrayStorage();
})
root.appendChild(section1);//把之前动态添加的节点显示出来

