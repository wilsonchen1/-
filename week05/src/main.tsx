import "./styles/main.css";
import "./styles/iconfont.css";
import React, {useState } from "react";
import ReactDOM from "react-dom/client";
import TodoList, { todos } from "./todolist";
import { todos_active,myLocalStorage } from "./todolist";
import { Todo } from "./types";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

function App() {

  const [Value,setValue]=useState('');//给value设置状态，这样改动的时候重新渲染
  const inputRef=React.useRef(null);
  const getIptValue=(event: { target: { value:any; }; })=>{
    setValue(event.target.value);
    return event.target.value;//获取ipt的值
  }
  return (
    <>
      <div id="root">
        <header>
          <div className="title">Todo List</div>
          <input
            id="input"
            type="text"
            className="input"
            placeholder="What needs to be done?"
            autoComplete="off"
            value={Value}
            ref={inputRef}
            onChange={getIptValue}
            onKeyDown={event=>{if (event.key === 'Enter') {
              //这里我解释一下为什么把函数写返回值里，因为写在外面会报错呜呜
              //网上找了好多都不得行。
            
              let item: Todo = {//把新写的条目添加进来
                id: uuidv4(),
                content: Value,
                ctime: dayjs().toString(),
                mtime: dayjs().toString(),
                finished: false,
              };
              todos.unshift(item);//把新加入的数据放到数组的第一个位置（即按时间倒序）
              
              myLocalStorage(todos);//拼数组并存储本地
              if(todos.length===1)location.reload();
              //为了阻止第一次输入时没有办法触发渲染，
              //我选择第一次输入时刷新一次页面
              setValue('');//清空input
            }}}
          ></input>
        </header>
        <TodoList />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
