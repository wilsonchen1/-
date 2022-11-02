import React, { useEffect, useState } from "react";
// import Item from "./Item";
import { Todo } from "./types";
import "./styles/iconfont.css";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

const todos: Todo[] = JSON.parse(localStorage.getItem("_todos"));
 const todos_active: Todo[] = [];
const todos_finished: Todo[] = [];
function myLocalStorage() {
  //把数据存储到本地,并且维护这个数组
  //把已做和未做数组拼在一起存储。
  localStorage.setItem("_todos", JSON.stringify(todos));
}
export {todos_active,todos}
export {myLocalStorage}
export default function TodoList() {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);


  function Item(props: Todo) {
    const checked = (id: string) => {
      //修改finished的状态并存入本地
      setVisibleTodos(
        //返回需改的数组，修改状态重新渲染
        todos.map((todo: Todo) => {
          if (todo.id === id) {
            todo.finished = !todo.finished;
            todo.mtime = dayjs().toString(); //每次点击都要更新时间
            // myLocalStorage(todos);
          }
          return { ...todo };
        })
      );
    };
    const myDelete = (id: string) => {
      // let new_todos=todos.filter((todo) =>{ todo.id !== id;myLocalStorage(new_todos)})
      // setVisibleTodos(new_todos)
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
