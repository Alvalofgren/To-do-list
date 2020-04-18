import React, { useState } from "react";
import "./styles.css";

/*
a todo will look like this,
{
  text: "a todo",
  completed: false/true
}
*/

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = event => {
    event.preventDefault();
    setTodos(currTodos => {
      const newTodo = {
        text: inputValue,
        completed: false
      };
      return currTodos.concat(newTodo);
    });
    setInputValue("");
  };

  const handleCompleteTodo = (event, complededTodo) => {
    event.preventDefault();
    setTodos(currTodos => {
      return currTodos.map(todo => {
        if (todo.text === complededTodo.text) {
          return { ...todo, completed: true };
        } else {
          return todo;
        }
      });
    });
    setInputValue("");
  };

  const handleRemoveTodo = (event, todoToRemove) => {
    event.preventDefault();
    setTodos(currTodos => {
      return currTodos.filter(todo => todo.text !== todoToRemove.text);
    });
  };

  const unFinshedTodos = todos.filter(todo => !todo.completed);
  const finishedTodos = todos.filter(todo => todo.completed);

  console.log("finishedTodos", finishedTodos);
  console.log("todos", unFinshedTodos);

  return (
    <div className="App">
      <header>
        <form id="to-do-form">
          <h1>My to-do-list</h1>
          <h2>April 2020</h2>
          <input
            placeholder="New todo..."
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
          />
          <div>
            <button type="button" onClick={event => handleAddTodo(event)}>
              Add todo
            </button>
          </div>
        </form>
      </header>

      <div>
        <header>
          <form id="to-do-item">
            <h4>My todos:</h4>
            <ul className="todo-list">
              {unFinshedTodos.map(todo => (
                <li
                  key={todo.text}
                  className="todo-item"
                  style={{
                    borderColor: "red"
                  }}
                >
                  <span>{todo.text}</span>
                  <button onClick={event => handleCompleteTodo(event, todo)}>
                    Done
                  </button>
                </li>
              ))}
            </ul>
          </form>
          <div>
            <h4>Completed todos:</h4>
            <ul className="todo-list">
              {finishedTodos.map(todo => (
                <li
                  key={todo.text}
                  className="todo-item"
                  style={{
                    borderColor: "blue"
                  }}
                >
                  <span>{todo.text}</span>
                  <button onClick={event => handleRemoveTodo(event, todo)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </header>
      </div>
    </div>
  );
}
