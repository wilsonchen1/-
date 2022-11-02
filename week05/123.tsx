import React, { useState, useEffect } from 'react';
import './App.css';

function TodoForm({addTodo}){
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue("");
  }
  return (
  <form onSubmit={handleSubmit}>
    <input 
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)}
      />
  </form>
  )
}

function App (props){
  const [todos, setTodos] = useState([
    {
      text: "learn react hook",
      isCompleted: false
    },
    {
      text: "optimize dynamic loding",
      isCompleted: false
    },
    {
      text: "learn redux-saga",
      isCompleted: false
    },
  ]);
  const addTodo = (text) => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
  };
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  const Todo = ({todo, index}) => <li
    style={{textDecoration: todo.isCompleted ? "line-through" : ""}}
   >
    {todo.text}
    <button onClick={() => completeTodo(index)}>Complete</button>
    <button onClick={() => removeTodo(index)}>x</button>
  </li>
  return <div>
    <ul>
      {todos.map((item, index) => 
        <Todo key={index}
        index={index}
        todo={item}
        />
        )}
    </ul>
    <TodoForm addTodo={addTodo}/>
  </div>
}

export default App;