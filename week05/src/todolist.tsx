import React, { useEffect, useState } from "react";
// import Item from "./Item";
import { Todo } from "./types";
import "./styles/iconfont.css";
import dayjs from "dayjs";

let todos: Todo[] = JSON.parse(localStorage.getItem("_todos"));
const todos_active: Todo[] = [];
const todos_finished: Todo[] = [];
function myLocalStorage(a: Todo[]) {
  //把数据存储到本地,并且维护这个数组
  //把已做和未做数组拼在一起存储
  localStorage.setItem("_todos", JSON.stringify(a));
}
export { todos_active, todos };
export { myLocalStorage };
export default function TodoList() {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  function Item(props: Todo) {
    // function Change(
    //   // arr_finished: Todo[],
    //   // arr_active: Todo[],
    //   ischange: boolean,
    //   item: Todo,
    //   index: number
    // ) {
    //   if (ischange === true) {
    //     todos_finished.unshift(item);
    //     todos_active.splice(index, 1);
    //     todos = todos_active.concat(todos_finished);
    //   } else {
    //     todos_active.unshift(item);
    //     todos_finished.splice(index, 1);
    //     todos = todos_active.concat(todos_finished);
    //   }
    // }

    const checked = (id: string) => {
      //修改finished的状态并存入本地
      setVisibleTodos(
        //返回需改的数组，修改状态重新渲染
        todos.map((todo: Todo, index: number) => {
          if (todo.id === id) {
            todo.finished = !todo.finished;
            todo.mtime = dayjs().toString(); //每次点击都要更新时间
            myLocalStorage(todos);
          }
          return { ...todo };
        })
      );
    };
    const myDelete = (id: string) => {
      // for(let i=0;i<todos.length;i++){
      //   if(todos[i].id===id)
      //   todos.splice(i,1);
      // }
      // setVisibleTodos(todos.filter((todo) => todo.id !== id));
      todos = todos.filter((todo) => todo.id !== id);
      setVisibleTodos(todos)
      myLocalStorage(todos);
    };
    return (
      //这里返回的是每一条小的条目，单独拆分成一个组件
      <div
        className={
          props.finished === true ? "todo-item todo-finished" : "todo-item"
        }
      >
        <i
          className="iconfont icon-checkbox"
          onClick={() => checked(props.id)}
        ></i>
        <span className="todo-title">{props.content}</span>
        <span className="todo-title">{props.mtime}</span>
        <i
          className="iconfont icon-delete"
          onClick={() => myDelete(props.id)}
        ></i>
      </div>
    );
  }
  if (visibleTodos)
    return (
      //这里是整个列表的大组件，调用的是上面代码的Item小组件
      <section>
        {Array.isArray(visibleTodos)
          ? visibleTodos.map(
              (
                item,
                index //不判断是否为数组时map函数报错
              ) => (
                <Item
                  key={index}
                  id={item.id}
                  ctime={item.ctime}
                  mtime={item.mtime}
                  content={item.content}
                  finished={item.finished}
                />
              )
            )
          : null}
      </section>
    );
  else return <></>;
}
