import { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  // implementing useState hook 
  const [todos, setTodos] = useState([])

  const addTodo = (e) => {
    if (e.target.value === "") return;
    // create a todo object
    const newToDo = {
      text: e.target.value,
      id: Date.now(),
      completed: false
    }
    // add new todo to the array
    setTodos([...todos, newToDo])
    // reset the input 
    e.target.value = "";
  }

  const completeTodo = (id, e) => {
    // creating a new copy of todos array
    const todosCopy = [...todos]
    // find the todo that matches the ID
    const indexOfTodo = todosCopy.findIndex(i => i.id === id)
    // updating the completed value to the opposite
    todosCopy[indexOfTodo].completed = !todosCopy[indexOfTodo].completed
    setTodos([...todosCopy]);
  };

  const deleteTodo = (id) => {
    const todosCopy = [...todos];
    const indexOfTodo = todosCopy.findIndex(i => i.id === id);
    todosCopy.splice(indexOfTodo, 1);
    setTodos([...todosCopy])
  }

  const editTodoText = (id, e) => {
    console.log(id);
    const todosCopy = [...todos];
    const indexOfTodo = todosCopy.findIndex(i => i.id === id);
    todosCopy[indexOfTodo].text = e.target.value;
    setTodos([...todosCopy]);
    e.target.value = "";
  }
  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoList 
      todos={todos} 
      addTodo={addTodo} 
      completeTodo={completeTodo} 
      editTodoText={editTodoText}
      deleteTodo={deleteTodo}/>
    </div>
  );
}

export default App;
