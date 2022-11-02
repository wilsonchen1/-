// import React, { useState } from "react";
// import { Todo } from "./types";
// import { todos } from "./todolist";
// import dayjs from "dayjs";
// import { v4 as uuidv4 } from "uuid";

// export default function Item(props: Todo) {
//   // function myLocalStorage(a: Todo[]) {
//   //   //把数据存储到本地,并且维护这个数组
//   //   localStorage.setItem("_todos", JSON.stringify(a));
//   // }
  
//   return (
//     //这里返回的是每一条小的条目，单独拆分成一个组件
//     <div
//       className={
//         props.finished === true ? "todo-item todo-finished" : "todo-item"
//       }
//     >
//       <i
//         className="iconfont icon-checkbox"
//         onClick={() => checked(props.id)}
//       ></i>
//       <span className="todo-title">{props.content}</span>
//       <span className="todo-title">{props.mtime}</span>
//       <i
//         className="iconfont icon-delete"
//         onClick={() => myDelete(props.id)}
//       ></i>
//     </div>
//   );
// }